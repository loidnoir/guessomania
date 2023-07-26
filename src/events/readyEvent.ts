import contactCommandData from '@commands/contact/data'
import helpCommandData from '@commands/help/data'
import joinCommandData from '@commands/join/data'
import playCommandData from '@commands/play/data'
import config from '@constants/config'
import { consoleSuccess } from '@helpers/loggers'
import GameClient from '@structures/Client'
import { ActivityType } from 'discord.js'

export default async function(client: GameClient) {
  await client.application?.commands.create(playCommandData)
  await client.application?.commands.create(joinCommandData)
  await client.application?.commands.create(helpCommandData)
  await client.guilds.cache.get(config.guild)?.commands.create(contactCommandData)
  // await client.guilds.cache.get(config.guild)?.commands.create(testCommandData)

  client.user?.setActivity({
    name: `for ${client.games.size} games`,
    type: ActivityType.Watching
  })

  consoleSuccess('App Ready!')
}