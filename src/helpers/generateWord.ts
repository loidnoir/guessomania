import GameClient from '../structures/Client'
import { GameTopics } from '../structures/game/types'

export default function generateWord(client: GameClient, difficulty: number, topic: GameTopics, duplicateWords: string[]) {
  let words

  if (topic == 'animal') words = client.animalWords
  else if (topic == 'anime') words = client.animeWords
  else if (topic == 'programming') words = client.programmingWords
  else words = client.originalWords

  words = words.filter(word => word.difficulty == difficulty)
  const randomIndex = Math.floor(Math.random() * words.length)
  const word = words[randomIndex]

  if (duplicateWords.includes(word.value)) return generateWord(client, difficulty, topic, duplicateWords)

  return word
}