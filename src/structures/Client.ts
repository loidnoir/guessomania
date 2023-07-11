import { Client, Collection } from 'discord.js'
import clientOptions from '../constants/clientOptions'
import { Word, animals, anime, food, general } from '../constants/words'
import interactionEvent from '../events/interactionEvent'
import readyEvent from '../events/readyEvent'
import Game from './game/Game'

export default class GameClient extends Client {
  public games: Collection<string, Game> = new Collection()
  public foodWords: Word[] = JSON.parse(JSON.stringify(food)).data as Word[]
  public animalWords: Word[] = JSON.parse(JSON.stringify(animals)).data as Word[]
  public animeWords: Word[] = JSON.parse(JSON.stringify(anime)).data as Word[]
  public generalWords: Word[] = JSON.parse(JSON.stringify(general)).data as Word[]

  constructor() {
    super(clientOptions)
  }

  public async start() {
    this.on('interactionCreate', async interaction => await interactionEvent(this, interaction))
    this.once('ready', () => readyEvent(this))
    this.login(process.env.TOKEN)
  }
}