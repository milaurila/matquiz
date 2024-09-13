import FOODS from '../../data/food-items.js'
import {random} from '../pages/game-utils.js'

const api = 'https://api.edamam.com/api/food-database/v2/parser?q=&'
const app_id = '8367893f'
const app_key = '9e320980390f411e7b3cb57f1843b320'
const queries = new URLSearchParams({
  app_id : app_id,
  app_key : app_key,
  category : 'generic-foods',
  ingr : 0
})

export async function get_random_food() {
  queries.set('ingr', random(FOODS))
  const item = await fetch(api + queries).then(res => res.json())

  if (item.parsed.length != 0) {
      if (item.parsed[0].food.image === undefined) {
          return get_random_food()
      } else {
          return item.parsed[0].food
      }
  } else {
    return get_random_food()
  }
}

export async function get_food(food) {
  queries.set('ingr', food)
  const item = await fetch(api + queries).then(res => res.json())

  if (item.parsed.length === 0) {
    return -1
  }

  return item.parsed[0].food
}

