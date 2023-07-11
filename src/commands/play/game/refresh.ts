import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageActionRowComponentBuilder, TextChannel, bold, userMention } from 'discord.js'
import colors from '../../../constants/colors'
import emojis from '../../../constants/emojis'
import GameClient from '../../../structures/Client'

export default async function playCommandRefreshPlay(client: GameClient, interaction: ButtonInteraction, id: string) {
  const game = client.games.get(id)

  if (!game) return

  const teamIndex = game.teamIndex
  const playerIndex = game.teams[teamIndex].playerIndex

  if (!game.messageId) return

  const player = game.teams[teamIndex].players[playerIndex]
  const playerUser = client.users.cache.get(player) ?? await client.users.fetch(player)
  const channel = (client.channels.cache.get(game.channelId) ?? await client.channels.fetch(game.channelId)) as TextChannel
  const message = channel.messages.cache.get(game.messageId) ?? await channel.messages.fetch(game.messageId)

  if (!message) return

  const buttons = [
    new ButtonBuilder()
      .setCustomId(`play-${game.id}-${player}`)
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
    .setColor(colors.primary)
    .setDescription(`Hosted by ${userMention(game.hostId)}\nWords topic: ${bold(game.topic)}\nGuess time: ${bold(game.time.toString())} \`seconds\``)
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
      components: [actionRow],
      embeds: [embed]
    })
  }

  catch (err) {
    console.log('Something went wrong while editing message', err)
  }
}