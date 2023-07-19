import generateErrorEmoji from '@helpers/generateErrorEmoji'
import GameClient from '@structures/Client'
import Game from '@structures/game/Game'
import { ChatInputCommandInteraction, bold } from 'discord.js'

export default async function joinCommandExecute(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>) {
  const code = interaction.options.getString('code', true)
  const teamIndex = interaction.options.getNumber('team', true)

  const game = client.games.get(code)

  if (!game) {
    await interaction.reply({ content: `The game was not found. ${generateErrorEmoji()}`, ephemeral: true })
    return
  }

  const error = await Game.addPlayer(client, code, interaction.guildId, interaction.user.id, teamIndex)

  if (typeof error == 'string') {
    await interaction.reply({ content: error ?? 'Something went wrong', ephemeral: true })
    return
  }

  await interaction.reply({ content: `You have successfully joined the game. You are from ${bold(game.teams[teamIndex].name)}`, ephemeral: true })
}