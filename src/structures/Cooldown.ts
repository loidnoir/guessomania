import GameClient from './Client'

export default class Cooldown {
  public guildId: string
  public userId: string
  public timeInMs: number
  public expires: Date

  constructor(guildId: string, userId: string, timeInMs: number, expires: Date) {
    this.guildId = guildId
    this.userId = userId
    this.expires = expires
    this.timeInMs = timeInMs
  }

  public static getCooldown(client: GameClient, id: string, timeInMs?: number) {
    const cooldownData = client.cooldown.get(id)
  }
}