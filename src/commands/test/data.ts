import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputApplicationCommandData } from 'discord.js'

const testCommandData: ChatInputApplicationCommandData = {
  name: 'test',
  description: 'Test command',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'code',
      description: 'Code to test',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ]
}

export default testCommandData