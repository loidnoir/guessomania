import { ButtonInteraction, TextChannel } from 'discord.js'
import generateErrorEmoji from '../../../helpers/generateErrorEmoji'
import GameClient from '../../../structures/Client'

export default async function playCommandEnd(client: GameClient, interaction: ButtonInteraction) {
  const id = interaction.customId.split('-')[1]
  const game = client.games.get(id)

  if (!game) return

  if (game.hostId != interaction.user.id) {
    await interaction.reply(`You are not the host of this game. ${generateErrorEmoji()}`)
    return
  }

  if (game.messageId) {
    const channel = (client.channels.cache.get(game.channelId) ?? await client.channels.fetch(game.channelId)) as TextChannel

    if (!channel) return

    const message = channel.messages.cache.get(game.messageId) ?? await channel.messages.fetch(game.messageId)

    if (!message) return

    await message.delete()
  }


  try {
    await interaction.editReply('Game has been stopped.')
  }

  catch {
    await interaction.reply('Game has been stopped.')
  }

  client.games.delete(id)
}