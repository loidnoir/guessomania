import colors from '@constants/colors'
import config from '@constants/config'
import GameClient from '@structures/Client'
import { EmbedBuilder, ModalSubmitInteraction, TextChannel } from 'discord.js'
import { contactTag } from './autocomplete'

export default function contactModal(client: GameClient, interaction: ModalSubmitInteraction) {
  const tag = interaction.customId.split('-')[1] as contactTag
  const rows = parseInt(interaction.customId.split('-')[2])
  const author = interaction.user

  const firstRow = interaction.fields.getTextInputValue('description')
  const secondRow = rows >= 2 ? interaction.fields.getTextInputValue('instruction') : undefined
  const thirdRow = rows == 3 ? interaction.fields?.getTextInputValue('optional') : undefined

  const embed = new EmbedBuilder()
    .setColor(colors.primary)
    .setDescription(`# Report from ${author.username}\nTag \`${tag}\`\nUser id \`${author.id}\``)
    .addFields([
      {
        name: 'Description',
        value: firstRow
      }
    ])

  if (secondRow) {
    embed.addFields({
      name: 'Instruction',
      value: secondRow
    })
  }

  if (thirdRow) {
    embed.addFields({
      name: 'Optional',
      value: thirdRow
    })
  }

  const logsChannel = (client.channels.cache.get(config.logs) ?? client.channels.fetch(config.logs)) as TextChannel

  logsChannel.send({ embeds: [embed] })

  interaction.reply({
    content: 'Your report has been successfully sent to the specialists',
    ephemeral: true
  })
}