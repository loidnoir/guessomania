import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, Collection, EmbedBuilder, MessageActionRowComponentBuilder, TextChannel, bold, userMention } from 'discord.js'
import colors from '../../../constants/colors'
import emojis from '../../../constants/emojis'
import generateWord from '../../../helpers/generateWord'
import GameClient from '../../../structures/Client'
import playCommandRefreshPlay from './refresh'

export default async function playCommandPlay(client: GameClient, interaction: ButtonInteraction) {
  const id = interaction.customId.split('-')[1]
  const player = interaction.customId.split('-')[2]
  const game = client.games.get(id)

  if (player != interaction.user.id) {
    await interaction.reply({ content: 'It is not your turn.', ephemeral: true })
    return
  }

  if (!game) {
    await interaction.reply({ content: 'This game does not exist.', ephemeral: true })
    return
  }

  const playerUser = client.users.cache.get(player) ?? await client.users.fetch(player)

  if (game.messageId) {
    const channel = (client.channels.cache.get(game.channelId) ?? await client.channels.fetch(game.channelId)) as TextChannel

    if (!channel) return

    const message = channel.messages.cache.get(game.messageId) ?? await channel.messages.fetch(game.messageId)

    if (!message) return

    const buttons = [
      new ButtonBuilder()
        .setCustomId(`play-${game.id}-${player}`)
        .setLabel(`${playerUser.username} started playing`)
        .setStyle(ButtonStyle.Success)
        .setEmoji(emojis.play)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId(`end-${id}`)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('End the game')
        .setEmoji(emojis.trash)
        .setDisabled(true)
    ]

    const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>()
      .addComponents(buttons)

    try {
      await message.edit({
        components: [actionRow],
      })
    }

    catch (err) {
      console.log('Could not edit message.', err)
    }
  }

  if (!playerUser) {
    await interaction.reply({ content: 'Could not find this player.', ephemeral: true })
    return
  }

  const word = generateWord(client, game.difficulty, game.topic, game.words)

  const buttons = [
    new ButtonBuilder()
      .setCustomId('guessed')
      .setLabel('Guessed')
      .setStyle(ButtonStyle.Success)
      .setEmoji(emojis.ok),
    new ButtonBuilder()
      .setCustomId('skip')
      .setLabel('Skip')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(emojis.trash),
  ]

  const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>()
    .addComponents(buttons)

  try {
    const message = await interaction.reply({
      content: word.value,
      components: [actionRow],
      ephemeral: true
    })

    const collector = message.createMessageComponentCollector({
      time: game.time * 1000,
    })

    const teamIndex = game.teams.findIndex(team => team.players.includes(playerUser.id))

    collector.on('collect', async (interaction) => {
      const word = generateWord(client, game.difficulty, game.topic, game.words)
      game.words.push(word.value)

      if (interaction.customId == 'guessed') {
        game.teams[teamIndex].score += 1

        await interaction.update({
          content: word.value
        })
      }

      else {
        await interaction.update({
          content: word.value
        })
      }
    })

    collector.on('end', async (collected: Collection<MessageActionRowComponentBuilder, ButtonInteraction>) => {
      const maxPlayerIndex = game.teams[teamIndex].players.length - 1

      game.words = []

      if (game.teams[teamIndex].playerIndex == maxPlayerIndex) game.teams[teamIndex].playerIndex = 0
      else game.teams[teamIndex].playerIndex += 1

      if (game.teamIndex == game.teams.length - 1) {
        game.teamIndex = 0

        if (game.teams.some(team => team.score >= game.winScore) && game.messageId) {
          const winnerTeam = game.teams.find(team => team.score >= game.winScore)
          const channel = (client.channels.cache.get(game.channelId) ?? await client.channels.fetch(game.channelId)) as TextChannel
          const message = channel.messages.cache.get(game.messageId) ?? await channel.messages.fetch(game.messageId)

          if (!message) return

          const embed = new EmbedBuilder()
            .setColor(colors.primary)
            .setDescription(`Hosted by ${userMention(game.hostId)}\nWords topic: ${bold(game.topic)}\nRound time: ${bold(game.time.toString())} seconds\n# ${winnerTeam?.name} won with ${winnerTeam?.score} points!`)
            .addFields(game.teams.map(team => {
              return {
                name: `${team.name} (${team.score}/${game.winScore})`,
                value: `${team.players.map(player => {
                  return `- ${userMention(player)}`
                }).join('\n')}`,
                inline: true
              }
            }))

          try {
            await message.edit({
              embeds: [embed]
            })
          }

          catch (err) {
            console.log('Could not edit message.', err)
          }

          return
        }
      }

      else {
        game.teamIndex += 1
      }


      try {
        await message.edit({
          content: `Good job! You have guessed ${bold(collected.filter(value => value.customId == 'guessed').size.toString() + '/' + collected.size.toString())} words.`,
          components: [],
        })
      }

      catch (err) {
        console.log('Could not edit message.', err)
      }

      await playCommandRefreshPlay(client, interaction, id)
    })
  }

  catch {
    await interaction.reply({ content: 'Could not send message to this player. Check your DM privacy settings.', ephemeral: true })
    return
  }
}