import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputApplicationCommandData } from 'discord.js'

const faqCommandData: ChatInputApplicationCommandData = {
  name: 'faq',
  nameLocalizations: { ru: 'чаво' },
  description: 'Frequently asked questions.',
  descriptionLocalizations: { ru: 'Часто задаваемые вопросы.' },
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

const faqCommandCategories: faqCommandCategoriesInterface = {
  guide: '🔗',
  info: '🗒️',
  option: '🔑'
}

interface faqCommandCategoriesInterface {
  guide: string
  info: string
  option: string
}

export default faqCommandData
export { faqCommandCategories, faqCommandCategoriesInterface }

