import {get_random_food} from '../../api/api.js'
import Game1 from './Game1.js'

document.getElementById('start').addEventListener('click', start)

let game = new Game1()
document.getElementById('new-game').addEventListener('click', start_new)

function start() {
  document.querySelector('section').style.display = 'none'
  document.getElementById('game1').style.display = 'block'

  start_new()
}

async function start_new() {
  const responses = []
  for (let i = 0; i < 3; i++) {
    responses.push(await get_random_food())
  }

  game.new_game(responses)
}
