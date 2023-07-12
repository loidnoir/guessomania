import { PrismaClient } from '@prisma/client'
import { Client, Collection } from 'discord.js'
import clientOptions from '../constants/clientOptions'
import { Word, animals, anime, original, programming } from '../constants/words'
import interactionEvent from '../events/interactionEvent'
import readyEvent from '../events/readyEvent'
import Premium from './Premium'
import Game from './game/Game'

export default class GameClient extends Client {
  public prisma: PrismaClient = new PrismaClient()
  public games: Collection<string, Game> = new Collection()
  public premium: Collection<string, Premium> = new Collection()

  public animalWords: Word[] = JSON.parse(JSON.stringify(animals)).data as Word[]
  public animeWords: Word[] = JSON.parse(JSON.stringify(anime)).data as Word[]
  public originalWords: Word[] = JSON.parse(JSON.stringify(original)).data as Word[]
  public programmingWords: Word[] = JSON.parse(JSON.stringify(programming)).data as Word[]

  constructor() {
    super(clientOptions)
  }

  public async start() {
    this.prisma.$connect()
    this.on('interactionCreate', async interaction => await interactionEvent(this, interaction))
    this.once('ready', () => readyEvent(this))
    this.login(process.env.TOKEN)
  }
}