import crypto from 'crypto'
import GameClient from '../structures/Client'

export default function generateId(client: GameClient) {
  const id = crypto.randomUUID().split('-')[0].slice(0, 5).toLowerCase()

  if (client.games.some(game => game.gameId == id)) return generateId(client)

  return id
}