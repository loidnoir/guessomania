import GameClient from '@structures/Client'
import { ChatInputCommandInteraction } from 'discord.js'
import { Tag } from './autocomplete'

export default async function helpCommandExecute(client: GameClient, interaction: ChatInputCommandInteraction) {
  const id = interaction.options.getString('tag', true)
  const target = interaction.options.getUser('target')

  const tag = client.tags.filter(tag => tag.id[0] == id)[0] as Tag

  await interaction.reply({
    content: `${tag.value}${target ? `\n\nMessage for ${target}` : ''}`,
    ephemeral: target ? false : true
  })
}