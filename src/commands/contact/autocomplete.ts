import GameClient from '@structures/Client'
import { AutocompleteInteraction } from 'discord.js'

export default async function contactCommandAutocomplete(client: GameClient, interaction: AutocompleteInteraction) {
  const type = interaction.options.getString('type', true) as 'other' | 'feature' | 'premium' | 'issue'

  switch (type) {
  case 'feature':
    interaction.respond([
      {
        name: '📖 New pack/dictionary',
        value: 'feature-pack'
      },
      {
        name: '🧩 New game mod',
        value: 'feature-gamemod'
      },
      {
        name: '🔎 Other',
        value: 'other'
      }
    ])
    break
  case 'issue':
    interaction.respond([
      {
        name: '🐛 Bug',
        value: 'issue-bug'
      },
      {
        name: '💎 Premium issue',
        value: 'issue-premium'
      },
      {
        name: '💰 Payment issue',
        value: 'premium-paymentIssue'
      },
      {
        name: '🔎 Other',
        value: 'other'
      }
    ])
    break
  case  'premium':
    interaction.respond([
      {
        name: '💎 Custom bot/package',
        value: 'premium-custom'
      },
      {
        name: '🔎 Other',
        value: 'other'
      }
    ])
    break
  default:
    interaction.respond([
      {
        name: '📞 Contact specialists',
        value: 'contact'
      }
    ])
  }
}

export type contactTag = 'feature-pack' | 'feature-gamemod' | 'issue-bug' | 'issue-premium' | 'issue-paymentIssue' | 'premium-custom' | 'other'