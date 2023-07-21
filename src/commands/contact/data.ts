import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputApplicationCommandData } from 'discord.js'

const contactCommandData: ChatInputApplicationCommandData = {
  name: 'contact',
  nameLocalizations: { ru: 'связаться' },
  description: 'Contact with our specialists.',
  descriptionLocalizations: { ru: 'Связаться с нашими специалистами.' },
  dmPermission: true,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'type',
      nameLocalizations: { ru: 'тип' },
      description: 'Tag for the report type.',
      descriptionLocalizations: { ru: 'Тег для типа репорта.' },
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: '🔎 Other',
          value: 'other'
        },
        {
          name: '💡 Feature',
          value: 'feature'
        },
        {
          name: '💎 Premium',
          value: 'premium'
        },
        {
          name: '🔧 Issue',
          value: 'issue'
        }
      ]
    },
    {
      name: 'tag',
      nameLocalizations: { ru: 'тег' },
      description: 'Tag for the report type.',
      descriptionLocalizations: { ru: 'Тег для типа репорта.' },
      type: ApplicationCommandOptionType.String,
      autocomplete: true,
      required: true
    }
  ]
}

export default contactCommandData