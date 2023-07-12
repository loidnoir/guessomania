import { ChatInputCommandInteraction } from 'discord.js'
import GameClient from '../../structures/Client'
import Premium from '../../structures/Premium'

export default function testCommandExecute(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>) {
  const status = Premium.getStatus(client, interaction.guildId)

  interaction.reply(`Premium status: ${status}`)
}