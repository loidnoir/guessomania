import { ChatInputCommandInteraction } from 'discord.js'
import reply from '../../helpers/reply'
import GameClient from '../../structures/Client'

export default function testCommandExecute(client: GameClient, interaction: ChatInputCommandInteraction) {
  const code = interaction.options.getString('code', true)
  const game = client.games.get(code)

  if (!game) return

  const players = ['690728155052245072', '905978698119909426', '1126026702410227832', '1125867550404792500']

  game.teams[0].players.push(players[0], players[1])
  game.teams[1].players.push(players[2], players[3])
  game.players.push(...players)

  reply({
    client,
    interaction,
    content: 'gtg',
    update: false
  })
}