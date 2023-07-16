import premiumLimits from '../constants/premium'
import GameClient from '../structures/Client'
import Premium from '../structures/Premium'
import { GameTopics } from '../structures/game/types'

export default async function generateWord(client: GameClient, guildId: string, difficulty: number, topic: GameTopics, duplicateWords: string[]) {
  const premiumTier = await Premium.getTier(client, guildId)
  let words

  if (duplicateWords.length > premiumLimits[premiumTier].maxWords) {
    return null
  }

  if (topic == 'animal') words = client.animalWords
  else if (topic == 'anime') words = client.animeWords
  else if (topic == 'programming') words = client.programmingWords
  else words = client.originalWords

  words = words.filter(word => word.difficulty == difficulty)
  const randomIndex = Math.floor(Math.random() * words.length)
  const word = words[randomIndex]

  if (premiumTier != 'free') {
    if (duplicateWords.includes(word.value)) return generateWord(client, guildId, difficulty, topic, duplicateWords)
  }

  return word
}