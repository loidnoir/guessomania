import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputApplicationCommandData } from 'discord.js'

const joinCommandData: ChatInputApplicationCommandData = {
  name: 'join',
  nameLocalizations: { ru: 'присоединится' },
  description: 'Join a game.',
  descriptionLocalizations: { ru: 'Присоединиться к игре.' },
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: 'SendMessages',
  dmPermission: false,
  options: [
    {
      name: 'code',
      nameLocalizations: { ru: 'код' },
      description: 'Invite code',
      descriptionLocalizations: { ru: 'Код приглашения' },
      type: ApplicationCommandOptionType.String,
      required: true,
      maxLength: 5,
      minLength: 5
    },
    {
      name: 'team',
      nameLocalizations: { ru: 'команда' },
      description: 'Team',
      descriptionLocalizations: { ru: 'Команда' },
      type: ApplicationCommandOptionType.Number,
      autocomplete: true,
      required: true
    }
  ]
}

export default joinCommandData