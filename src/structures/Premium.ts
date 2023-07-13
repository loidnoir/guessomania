import GameClient from './Client'
export default class Premium {
  public id: string
  public user: string
  public expires: Date

  constructor(id: string, user: string, expires: Date) {
    this.id = id
    this.user = user
    this.expires = expires
  }

  public static async  getStatus(client: GameClient, id: string) {
    let data = client.premium.get(id)

    if (!data) {
      const requestedData = await client.prisma.premium.findFirst({
        where: {
          id: id
        }
      })

      if (!requestedData) {
        data = client.premium.set(id, new Premium(id, '', new Date())).get(id)
        return false
      }

      else {
        data = client.premium.set(id, new Premium(id, requestedData.buyer, requestedData.expiresAt)).get(id)

        if (data) {
          return data.expires > new Date()
        }

        return false
      }
    }

    return data.expires > new Date()
  }

  public static async setPremium(client: GameClient, id: string, user: string, expires: Date) {
    await client.prisma.premium.upsert({
      where: { id: id },
      update: { expiresAt: expires, buyer: user },
      create: { id: id, expiresAt: expires, buyer: user }
    })

    const data = client.premium.get(id)

    if (data) {
      data.expires = expires
      data.user = user
    }

    else {
      client.premium.set(id, new Premium(id, user, expires))
    }
  }
}