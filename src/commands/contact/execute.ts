import GameClient from '@structures/Client'
import { ActionRowBuilder, ChatInputCommandInteraction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js'
import { contactTag } from './autocomplete'

export default function contactCommandExecute(client: GameClient, interaction: ChatInputCommandInteraction) {
  const tag = interaction.options.getString('tag', true) as contactTag

  const firstRow = new TextInputBuilder()
    .setCustomId('description')
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(1000)
    .setMinLength(10)
    .setRequired(true)
  const secondRow = new TextInputBuilder()
    .setCustomId('instruction')
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(1000)
    .setMinLength(10)
    .setRequired(true)
  const thirdRow = new TextInputBuilder()
    .setCustomId('optional')
    .setLabel('Anything else we should know')
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(1000)
    .setRequired(false)

  const rows = []

  if (tag == 'feature-gamemod') {
    firstRow
      .setLabel('Gamemod description')
      .setPlaceholder('Blitz, a game mod where ...')
    secondRow
      .setLabel('Why should we add it ?')
      .setPlaceholder('It adds competition between ...')
    rows.push(firstRow, secondRow, thirdRow)
  }

  else if (tag == 'feature-pack') {
    firstRow
      .setLabel('Pack description')
      .setPlaceholder('Animals pack with words of...')
    secondRow
      .setLabel('Example words')
      .setPlaceholder('Monkey, Elephant, Dog ...')
      .setStyle(TextInputStyle.Short)
    rows.push(firstRow, secondRow)
  }

  else if (tag == 'issue-bug') {
    firstRow
      .setLabel('Describe the bug')
      .setPlaceholder('The x command not responded...')
    secondRow
      .setLabel('How you came across it ?')
      .setPlaceholder('I used the x command and ...')
    rows.push(firstRow, secondRow, thirdRow)
  }

  else if (tag == 'issue-paymentIssue') {
    firstRow
      .setLabel('Describe the issue')
      .setPlaceholder('I bought the x pack and ...')
    secondRow
      .setLabel('Describe the process')
      .setPlaceholder('1. I chose x pack\n2. I ...')
    rows.push(firstRow, secondRow, thirdRow)
  }

  else if (tag == 'issue-premium')  {
    firstRow
      .setLabel('Describe the issue')
      .setPlaceholder('The x thing from y pack ...')
    secondRow
      .setLabel('Describe the process')
      .setPlaceholder('I ran x command and ...')
    rows.push(firstRow, secondRow, thirdRow)
  }

  else if (tag == 'premium-custom') {
    firstRow
      .setLabel('Describe your server and the situation')
      .setPlaceholder('I have a server with x members and ...')
    secondRow
      .setLabel('What do you except from the bot ?')
      .setPlaceholder('I except the bot to ...')
    rows.push(firstRow, secondRow, thirdRow)
  }

  else {
    firstRow
      .setLabel('Describe the issue')
    rows.push(firstRow)
  }

  const actionRow = rows.map(row => {
    return new ActionRowBuilder<ModalActionRowComponentBuilder>()
      .addComponents(row)
  })

  const modal = new ModalBuilder()
    .addComponents(actionRow)
    .setCustomId(`contact-${tag}-${rows.length}`)
    .setTitle('Contact form')

  interaction.showModal(modal)
}