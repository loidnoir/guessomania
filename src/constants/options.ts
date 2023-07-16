import { ClientOptions, Partials } from 'discord.js'

const options: ClientOptions = {
  intents: [
    'DirectMessages',
    'GuildMembers',
    'Guilds'
  ],
  partials: [
    Partials.ThreadMember,
    Partials.GuildMember,
    Partials.Channel,
    Partials.User
  ]
}

export default options