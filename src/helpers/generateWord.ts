import { Word, animals, food, general } from '../constants/words'
import { GameTopics } from '../structures/game/types'

export default function(difficulty: number, topic: GameTopics) {
  let words

  if (topic == 'food') words = JSON.parse(JSON.stringify(food)).data as Word[]
  else if (topic == 'animal') words = JSON.parse(JSON.stringify(animals)).data as Word[]
  else words = JSON.parse(JSON.stringify(general)).data as Word[]

  words = words.filter(word => word.difficulty == difficulty)
  const randomIndex = Math.floor(Math.random() * words.length)
  const word = words[randomIndex]

  return word
}