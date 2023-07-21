type GameTopics = 'free' | 'original' | 'animal' | 'programming' | 'anime'

interface GameScheme {
  gameId: string
  guildId: string
  hostId: string
  channelId: string
  messageId?: string

  gameStarted: Date
  gameStatus: boolean

  words: string[]

  maxWords: number
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
  guildId: string
  channelId: string
  messageId?: string
  maxTeams: number

  winScore?: number | null
  maxWords?: number
  topic?: GameTopics
  difficulty?: number
  time?: number | null
}

export { GameConstructorData, GameScheme, GameTeam, GameTopics }

