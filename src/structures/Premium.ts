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

  public static async  getTier(client: GameClient, id: string): Promise<PremiumTier> {
    let data = client.premium.get(id)

    if (!data) {
      const requestedData = await client.prisma.premium.findFirst({
        where: {
          id: id
        }
      })

      if (!requestedData) {
        await client.prisma.premium.create({ data: { id, buyer: 'unknown', expiresAt: new Date(), tier: 'free' } })
        data = client.premium.set(id, new Premium(id, '', new Date(), 'free')).get(id)
        return 'free'
      }

      else {
        data = client.premium.set(id, new Premium(id, requestedData.buyer, requestedData.expiresAt, 'free')).get(id)

        if (data) {
          return data.tier
        }

        return 'free'
      }
    }

    return data.tier
  }

  public static async setPremium(client: GameClient, id: string, user: string, expires: Date, tier: PremiumTier) {
    await client.prisma.premium.upsert({
      where: { id: id },
      update: { expiresAt: expires, buyer: user, tier: tier },
      create: { id: id, expiresAt: expires, buyer: user, tier: tier}
    })

    const data = client.premium.get(id)

    if (data) {
      data.expires = expires
      data.user = user
    }

    else {
      client.premium.set(id, new Premium(id, user, expires, tier))
    }
  }
}

export type PremiumTier = 'free' | 'basic' | 'ultra'