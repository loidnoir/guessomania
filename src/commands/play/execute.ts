import { ChatInputCommandInteraction } from 'discord.js'
import generateId from '../../helpers/generateId'
import GameClient from '../../structures/Client'
import Game from '../../structures/game/Game'
import { GameTopics } from '../../structures/game/types'
import playInviteMessage from './inviteMessage'

export default async function playCommandExecute(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>) {
  const id = generateId(client)
  const maxTeams = interaction.options.getNumber('teams', true)
  const errorStatus = handleErrors(client, interaction)

  if (await errorStatus) return

  client.games.set(id, new Game(id, {
    hostId: interaction.user.id,
    channelId: interaction.channelId,
    maxTeams,
    // difficulty: interaction.options.getNumber('difficulty', true),
    winScore: interaction.options.getInteger('score', false),
    topic: (interaction.options.getString('topic', false) as GameTopics),
    time: interaction.options.getInteger('time', false),
  }))

  await playInviteMessage(client, interaction, id, maxTeams)
}

async function handleErrors(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>) {
  if (client.games.some(game => game.hostId == interaction.user.id)) {
    await interaction.reply({ content: 'You are already hosting a game', ephemeral: true })
    return true
  }
}