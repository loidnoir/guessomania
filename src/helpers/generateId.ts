import GameClient from '@structures/Client'
import crypto from 'crypto'

export default function generateId(client: GameClient, customCode: string | null) {
  if (!customCode) {
    const id = crypto.randomUUID().split('-')[0].slice(0, 5).toLowerCase()

    if (client.games.some(game => game.gameId == id)) return generateId(client, null)

    return id
  }

  else {
    if (client.games.some(game => game.gameId == customCode)) {
      return undefined
    }

    return customCode
  }
}