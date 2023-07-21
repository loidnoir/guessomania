import colors from '@constants/colors'
import emojis from '@constants/emojis'
import generateErrorEmoji from '@helpers/generateErrorEmoji'
import GameClient from '@structures/Client'
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageActionRowComponentBuilder, bold, userMention } from 'discord.js'

export default async function playCommandStart(client: GameClient, interaction: ButtonInteraction) {
  const id = interaction.customId.split('-')[1]
  const game = client.games.get(id)

  if (!game) {
    await interaction.reply({ content: `This game does not exist anymore. ${generateErrorEmoji()}`, ephemeral: true })
    return
  }

  const player = game.teams[0].players[0]
  const playerUser = client.users.cache.get(player) ?? await client.users.fetch(player)

  const buttons = [
    new ButtonBuilder()
      .setCustomId(`play-${game.gameId}-${player}`)
      .setLabel(`Play (${playerUser.username}'s turn)`)
      .setStyle(ButtonStyle.Success)
      .setEmoji(emojis.play),
    new ButtonBuilder()
      .setCustomId(`end-${id}`)
      .setStyle(ButtonStyle.Secondary)
      .setLabel('End the game')
      .setEmoji(emojis.trash)
  ]

  const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>()
    .addComponents(buttons)

  const embed = new EmbedBuilder()
    .setDescription(`Hosted by ${userMention(game.hostId)}\nWords topic: ${bold(game.topic)}\nRound time: ${bold(game.time.toString())} seconds`)
    .setColor(colors.primary)
    .addFields(game.teams.map(team => {
      return {
        name: team.name,
        value: `${team.players.map(player => { return `- ${userMention(player)}` }).join('\n')}`,
        inline: true
      }
    }))

  const message = await interaction.channel?.send({
    embeds: [embed],
    components: [actionRow]
  })

  if (message) {
    game.messageId = message.id
  }

  try {
    await interaction.update({ content: 'Game started!', components: [] })
    game.gameStatus = true
  }

  catch (err) {
    console.error('Something went wrong when editing message', err)
  }
}
