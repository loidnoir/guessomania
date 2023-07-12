import * as animals from '../words/animals.json'
import * as anime from '../words/anime.json'
import * as original from '../words/original.json'
import * as programming from '../words/programming.json'

export interface Word {
  value: string
  difficulty: 0 | 1 | 2
}

export { animals, anime, original, programming }

