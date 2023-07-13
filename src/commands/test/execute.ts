import { ChatInputCommandInteraction } from 'discord.js'
import GameClient from '../../structures/Client'
import Premium from '../../structures/Premium'

export default async function testCommandExecute(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>) {
  const code = interaction.options.getString('code', true)

  if (code == 'kk') {
    await Premium.setPremium(client, interaction.guildId, interaction.user.id, new Date(Date.now() + 10 * 1000))
  }

  const status = await Premium.getStatus(client, interaction.guildId)

  interaction.reply({ content: `Premium status: ${status}`, ephemeral: true })
}