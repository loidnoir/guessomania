import GameClient from '@structures/Client'
import { AutocompleteInteraction } from 'discord.js'
import { helpCommandCategories, helpCommandCategoriesInterface } from './data'
import * as tags from './tag.json'

export default async function helpCommandAutocomplete(client: GameClient, interaction: AutocompleteInteraction) {
  const tagStr = interaction.options.getString('tag', true)

  console.log(tagStr)

  if (tagStr) {
    const filtered = client.tags.filter(tag => tag.id.some(id => id.startsWith(tagStr)))

    await interaction.respond(
      filtered.map(tag =>
        ({ name: `${helpCommandCategories[tag.category as keyof(helpCommandCategoriesInterface)]} ${tag.label}`, value: tag.id[0] })
      )
    )

    return
  }

  await interaction.respond(
    client.tags.map(tag =>
      ({ name: `${helpCommandCategories[tag.category as keyof(helpCommandCategoriesInterface)]} ${tag.label}`, value: tag.id[0] })
    )
  )
}

export { tags }

export interface Tag {
  id: string[]
  label: string,
  category: string,
  value: string,
  image?: string
}