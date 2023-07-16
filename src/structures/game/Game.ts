import premiumLimits from '../../constants/premium'
import GameClient from '../Client'
import Premium from '../Premium'
import { GameConstructorData, GameScheme, GameTeam, GameTopics } from './types'

export default class Game implements GameScheme {
  public gameId: string
  public guildId: string
  public hostId: string
  public channelId: string
  public messageId?: string
  public words: string[]
  public winScore: number
  public maxWords: number
  public topic: GameTopics
  public difficulty: number
  public time: number
  public players: string[]
  public teams: GameTeam[]
  public teamIndex: number

  public constructor(id: string, data: GameConstructorData) {
    this.gameId = id
    this.hostId = data.hostId
    this.guildId = data.guildId
    this.channelId = data.channelId
    this.messageId = data.messageId
    this.words = []

    this.winScore = data.winScore ?? 30
    this.maxWords = data.maxWords ?? 10
    this.topic = data.topic ?? 'free'
    this.difficulty = data.difficulty ?? 0
    this.time = data.time ?? 60

    this.players = []
    this.teams = Array.from({ length: data.maxTeams }, (_, i) => ({ name: `Team #${i + 1}`, score: 0, players: [], index: i, playerIndex: 0 }))

    this.teamIndex = 0
  }

  public static async addPlayer(client: GameClient, gameId: string, guildId: string, playerId: string, teamIndex: number) {
    const game = client.games.get(gameId)

    if (!game) return Error('Game was not found')

    const premiumTier = await Premium.getTier(client, guildId)

    if (game.players.includes(playerId)) return this.switchPlayer(client, gameId, guildId, playerId, teamIndex)
    if (!game.teams[teamIndex].name) return 'Team does not exist'
    if (game.teams[teamIndex].players.length >= premiumLimits[premiumTier].maxPlayers) return 'Team is full'

    game.players.push(playerId)
    game.teams[teamIndex].players.push(playerId)
    return undefined
  }

  public static async switchPlayer(client: GameClient, gameId: string, guildId: string, playerId: string, teamIndex: number) {
    const game = client.games.get(gameId)
    const premiumTier = await Premium.getTier(client, guildId)

    if (!game) return 'Game was not found'
    if (!game.players.includes(playerId)) return 'Player is not in the game'
    if (!game.teams[teamIndex].name) return 'Team does not exist'
    if (game.teams[teamIndex].players.length >= premiumLimits[premiumTier].maxPlayers) return 'Team is full'

    const currentTeamIndex = game.teams.findIndex(team => team.players.includes(playerId))

    if (currentTeamIndex == teamIndex) return Error('Player is already in the team')

    game.teams[currentTeamIndex].players = game.teams[currentTeamIndex].players.filter(id => id !== playerId)
    game.teams[teamIndex].players.push(playerId)
    return undefined
  }
}