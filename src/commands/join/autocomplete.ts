import { AutocompleteInteraction } from 'discord.js'
import GameClient from '../../structures/Client'

export default async function joinCommandAutocomplete(client: GameClient, interaction: AutocompleteInteraction) {
  const id = interaction.options.getString('code', true)
  const game = client.games.get(id)

  if (!game) return

  await interaction.respond(game.teams.map(team => ({ name: `${team.name}`, value: team.index })))
}