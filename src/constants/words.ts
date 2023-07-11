import * as animals from '../words/animals.json'
import * as food from '../words/food.json'
import * as general from '../words/general.json'

export interface Word {
  value: string
  difficulty: 0 | 1 | 2
}

export { animals, food, general }
