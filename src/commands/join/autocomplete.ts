import premiumLimits from '@constants/premium'
import GameClient from '@structures/Client'
import Premium from '@structures/Premium'
import { AutocompleteInteraction } from 'discord.js'

export default async function joinCommandAutocomplete(client: GameClient, interaction: AutocompleteInteraction<'cached'>) {
  const premiumTier = await Premium.getTier(client, interaction.guildId)
  const id = interaction.options.getString('code', true)
  const game = client.games.get(id)
  const teams = game?.teams.filter(team => team.players.length < premiumLimits[premiumTier].maxPlayers)

  if (!game || !teams) return

  await interaction.respond(teams.map(team => ({ name: `${team.name}`, value: team.index })))
}