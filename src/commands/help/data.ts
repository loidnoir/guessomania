import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputApplicationCommandData } from 'discord.js'

const helpCommandData: ChatInputApplicationCommandData = {
  name: 'help',
  nameLocalizations: { ru: 'помощь' },
  description: 'Get and answer for your question.',
  descriptionLocalizations: { ru: 'Получите ответ на ваш вопрос.' },
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: 'SendMessages',
  dmPermission: false,
  options: [
    {
      name: 'tag',
      nameLocalizations: { ru: 'тег' },
      description: 'Choose tag to get info about.',
      descriptionLocalizations: { ru: 'Выберите тег что бы получить информацию.' },
      type: ApplicationCommandOptionType.String,
      autocomplete: true,
      required: true
    },
    {
      name: 'target',
      nameLocalizations: { ru: 'цель' },
      description: 'Choose target to mention.',
      descriptionLocalizations: { ru: 'Выберите цель что бы отметить.' },
      type: ApplicationCommandOptionType.User,
      required: false
    }
  ]
}

const helpCommandCategories: helpCommandCategoriesInterface = {
  guide: '🧭',
  info: '📄',
  option: '🔑',
  premium: '⭐️'
}

interface helpCommandCategoriesInterface {
  guide: string
  info: string
  option: string
  premium: string
}

export default helpCommandData
export { helpCommandCategories, helpCommandCategoriesInterface }

