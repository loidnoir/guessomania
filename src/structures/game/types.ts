type GameTopics = 'general' | 'food' | 'programming' | 'anime' | 'movie'

interface GameScheme {
  id: string
  hostId: string
  channelId: string
  messageId?: string
  words: string[]

  winScore: number
  topic: GameTopics
  difficulty: number
  time: number

  players: string[]
  teams: GameTeam[]

  teamIndex: number
}

interface GameTeam {
  name: string
  score: number
  players: string[]
  playerIndex: number
  index: number
}

interface GameConstructorData {
  hostId: string
  channelId: string
  messageId?: string
  maxTeams: number

  winScore?: number | null
  topic?: GameTopics
  difficulty?: number
  time?: number | null
}

export { GameConstructorData, GameScheme, GameTeam, GameTopics }

