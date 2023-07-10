const config: Config = {
  token: process.env.TOKEN ?? '',
  owner: process.env.OWNER ?? '',
  client: process.env.CLIENT ?? ''
}

interface Config {
  token: string
  owner: string
  client: string
}

export default config