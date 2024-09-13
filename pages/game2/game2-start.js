import {get_random_food} from '../../api/api.js'
import Game2 from './Game2.js'

document.getElementById('start').addEventListener('click', start)

let game = new Game2()
document.getElementById('new-game').addEventListener('click', start_new)

function start() {
  document.querySelector('section').style.display = 'none'
  document.getElementById('game2').style.display = 'block'

  start_new()
}

async function start_new() {
  const response = await get_random_food()

  game.new_game(response)
}
