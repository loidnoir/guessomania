import GameClient from '@structures/Client'
import { AutocompleteInteraction } from 'discord.js'

export default async function contactCommandAutocomplete(client: GameClient, interaction: AutocompleteInteraction) {
  const type = interaction.options.getString('type', true) as 'other' | 'feature' | 'premium' | 'issue'

  switch (type) {
  case 'feature':
    interaction.respond([
      {
        name: '📖 New pack/dictionary',
        value: 'feature_pack'
      },
      {
        name: '🧩 New game mod',
        value: 'feature_gamemod'
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
        value: 'issue_bug'
      },
      {
        name: '💎 Premium issue',
        value: 'issue_premium'
      },
      {
        name: '💰 Payment issue',
        value: 'premium_paymentIssue'
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
        value: 'premium_custom'
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

export type contactTag = 'feature_pack' | 'feature_gamemod' | 'issue_bug' | 'issue_premium' | 'issue_paymentIssue' | 'premium_custom' | 'other'