import emojis from '../constants/emojis'

export default function (): string {
  const emojisArray = emojis.error
  const randomIndex = Math.floor(Math.random() * emojisArray.length)

  return emojisArray[randomIndex]
}