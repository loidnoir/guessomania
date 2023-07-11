import GameClient from '../Client'
import { GameConstructorData, GameScheme, GameTeam, GameTopics } from './types'

export default class Game implements GameScheme {
  public id: string
  public hostId: string
  public channelId: string
  public messageId?: string
  public words: string[]
  public winScore: number
  public topic: GameTopics
  public difficulty: number
  public time: number
  public players: string[]
  public teams: GameTeam[]
  public teamIndex: number

  public constructor(id: string, data: GameConstructorData) {
    this.id = id
    this.hostId = data.hostId
    this.channelId = data.channelId
    this.messageId = data.messageId
    this.words = []

    this.winScore = data.winScore ?? 30
    this.topic = data.topic ?? 'general'
    this.difficulty = data.difficulty ?? 0
    this.time = data.time ?? 60

    this.players = []
    this.teams = Array.from({ length: data.maxTeams }, (_, i) => ({ name: `Team #${i + 1}`, score: 0, players: [], index: i, playerIndex: 0 }))

    this.teamIndex = 0
  }

  public static addPlayer(client: GameClient, gameId: string, playerId: string, teamIndex: number) {
    const game = client.games.get(gameId)

    if (!game) return Error('Game was not found')
    if (game.players.includes(playerId)) return this.switchPlayer(client, gameId, playerId, teamIndex)
    if (!game.teams[teamIndex].name) return Error('Team does not exist')

    game.players.push(playerId)
    game.teams[teamIndex].players.push(playerId)
  }

  public static switchPlayer(client: GameClient, gameId: string, playerId: string, teamIndex: number) {
    const game = client.games.get(gameId)

    if (!game) return Error('Game was not found')
    if (!game.players.includes(playerId)) return Error('Player is not in the game')
    if (!game.teams[teamIndex].name) return Error('Team does not exist')

    const currentTeamIndex = game.teams.findIndex(team => team.players.includes(playerId))

    if (currentTeamIndex == teamIndex) return Error('Player is already in the team')

    game.teams[currentTeamIndex].players = game.teams[currentTeamIndex].players.filter(id => id !== playerId)
    game.teams[teamIndex].players.push(playerId)
  }
}