import { ClientOptions, Partials } from 'discord.js'

const clientOptions: ClientOptions = {
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

export default clientOptions