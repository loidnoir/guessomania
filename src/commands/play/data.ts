import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputApplicationCommandData } from 'discord.js'

const playCommandData: ChatInputApplicationCommandData = {
  name: 'play',
  nameLocalizations: { 'ru': 'играть' },
  description: 'Start to play Alias',
  descriptionLocalizations: { 'ru': 'Начат игру Алиас' },
  defaultMemberPermissions: ['EmbedLinks', 'SendMessages'],
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'teams',
      nameLocalizations: { 'ru': 'команды' },
      description: 'Amount of teams.',
      descriptionLocalizations: { 'ru': 'Количество команд.' },
      type: ApplicationCommandOptionType.Number,
      required: true,
      minValue: 2,
      maxValue: 8
    },
    {
      name: 'topic',
      description: 'Words packs',
      nameLocalizations: { 'ru': 'тема' },
      descriptionLocalizations: { 'ru' : 'Тема слов в игре' },
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        {
          name: 'Original',
          nameLocalizations: { 'ru': 'Оригинальная' },
          value: 'original',
        },
        {
          name: 'Animals',
          nameLocalizations: { 'ru': 'Животные' },
          value: 'animals',
        },
        {
          name: 'Programming',
          nameLocalizations: { 'ru': 'Программирование' },
          value: 'programming',
        },
        {
          name: 'Anime',
          nameLocalizations: { 'ru': 'Аниме' },
          value: 'anime',
        }
      ]
    },
    {
      name: 'score',
      nameLocalizations: { 'ru': 'очки' },
      description: 'Winning score. Each word is count as one point.',
      descriptionLocalizations: { 'ru': 'Количество очков для победы. Каждое слово считается как одно очко.' },
      type: ApplicationCommandOptionType.Integer,
      required: false,
      minValue: 10,
      maxValue: 300
    },
    {
      name: 'time',
      nameLocalizations: { 'ru': 'время' },
      description: 'Time for each round in seconds.',
      descriptionLocalizations: { 'ru': 'Время для каждого раунда в секундах.' },
      type: ApplicationCommandOptionType.Integer,
      required: false,
      minValue: 10,
      maxValue: 180
    },
    {
      name: 'code',
      nameLocalizations: { 'ru': 'код' },
      description: 'Custom invite code.',
      descriptionLocalizations: { 'ru': 'Кастомный код приглашения.' },
      type: ApplicationCommandOptionType.String,
      required: false,
      minLength: 5,
      maxLength: 20
    }
  ]
}

export default playCommandData