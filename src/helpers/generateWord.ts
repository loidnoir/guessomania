import GameClient from '../structures/Client'
import { GameTopics } from '../structures/game/types'

export default function generateWord(client: GameClient, difficulty: number, topic: GameTopics, duplicateWords: string[]) {
  let words

  if (topic == 'food') words = client.foodWords
  else if (topic == 'animal') words = client.animalWords
  else words = client.generalWords

  words = words.filter(word => word.difficulty == difficulty)
  const randomIndex = Math.floor(Math.random() * words.length)
  const word = words[randomIndex]

  if (duplicateWords.includes(word.value)) return generateWord(client, difficulty, topic, duplicateWords)

  return word
}