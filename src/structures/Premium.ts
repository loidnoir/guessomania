import config from '@constants/config'
import GameClient from './Client'
export default class Premium {
  public id: string
  public user: string
  public expires: Date
  public tier: PremiumTier

  constructor(id: string, user: string, expires: Date, tier: PremiumTier) {
    this.id = id
    this.user = user
    this.expires = expires
    this.tier = tier
  }

  public static async getTier(client: GameClient, id: string) {
    return await (await fetch(config.api + `/premium?guildId=${id}`)).text() as PremiumTier
  }

  public static async setTier(client: GameClient, id: string, user: string, duration: string, tier: PremiumTier) {
    await fetch(config.api + `/premium?guildId=${id}&userId=${user}&duration=${duration}&tier=${tier}`, {
      method: 'POST'
    })
  }
}

export type PremiumTier = 'free' | 'basic' | 'ultra'