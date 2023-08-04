const config: Config = {
  api: process.env.API ?? '',
  token: process.env.TOKEN ?? '',
  owner: process.env.OWNER ?? '',
  guild: process.env.GUILD ?? '',
  client: process.env.CLIENT ?? '',
  logs: process.env.LOGS ?? ''
}

interface Config {
  api: string
  token: string
  owner: string
  guild: string
  client: string
  logs: string
}

export default config