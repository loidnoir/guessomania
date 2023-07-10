import { ChatInputCommandInteraction, bold } from 'discord.js'
import generateErrorEmoji from '../../helpers/generateErrorEmoji'
import GameClient from '../../structures/Client'
import Game from '../../structures/game/Game'

export default async function joinCommandExecute(client: GameClient, interaction: ChatInputCommandInteraction) {
  const code = interaction.options.getString('code', true)
  const teamIndex = interaction.options.getNumber('team', true)

  const game = client.games.get(code)

  if (!game) {
    await interaction.reply({ content: `The game was not found. ${generateErrorEmoji()}`, ephemeral: true })
    return
  }

  const error = Game.addPlayer(client, code, interaction.user.id, teamIndex)

  if (error) {
    await interaction.reply({ content: `Something went wrong. Please contact our support team. ${generateErrorEmoji()}`, ephemeral: true })
    return
  }

  await interaction.reply({ content: `You have successfully joined the game. You are from ${bold(game.teams[teamIndex].name)}`, ephemeral: true })
}