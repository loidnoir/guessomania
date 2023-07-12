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
      description: 'Number of teams.',
      descriptionLocalizations: { 'ru': 'Количество команд.' },
      type: ApplicationCommandOptionType.Number,
      required: true,
      minValue: 2,
      maxValue: 8
    },
    // {
    //   name: 'difficulty',
    //   nameLocalizations: { 'ru': 'сложность' },
    //   description: 'Difficulty of the game.',
    //   descriptionLocalizations: { 'ru': 'Сложность игры.' },
    //   type: ApplicationCommandOptionType.Number,
    //   required: true,
    //   choices: [
    //     {
    //       name: 'Easy',
    //       value: 0
    //     },
    //     {
    //       name: 'Hard',
    //       value: 1
    //     },
    //     {
    //       name: 'Academic',
    //       value: 2
    //     },
    //   ]
    // },
    {
      name: 'topic',
      description: 'Words topic in the game',
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
        },
        // {
        //   name: 'Movies',
        //   nameLocalizations: { 'ru': 'Фильмы' },
        //   value: 'movie',
        // }
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
    }
  ]
}

export default playCommandData