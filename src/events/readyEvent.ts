import { ActivityType } from 'discord.js'
import joinCommandData from '../commands/join/data'
import playCommandData from '../commands/play/data'
import testCommandData from '../commands/test/data'
import { consoleSuccess } from '../helpers/loggers'
import GameClient from '../structures/Client'

export default async function(client: GameClient) {
  await client.application?.commands.create(playCommandData)
  await client.application?.commands.create(joinCommandData)
  await client.application?.commands.create(testCommandData)

  client.user?.setActivity({
    name: `for ${client.users.cache.size} players`,
    type: ActivityType.Watching
  })

  consoleSuccess('App Ready!')
}