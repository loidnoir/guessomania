import { Client, Collection } from 'discord.js'
import clientOptions from '../constants/clientOptions'
import interactionEvent from '../events/interactionEvent'
import readyEvent from '../events/readyEvent'
import Game from './game/Game'

export default class GameClient extends Client {
  public games: Collection<string, Game> = new Collection()

  constructor() {
    super(clientOptions)
  }

  public async start() {
    this.on('interactionCreate', async interaction => await interactionEvent(this, interaction))
    this.once('ready', () => readyEvent(this))
    this.login(process.env.TOKEN)
  }
}