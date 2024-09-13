import {NUTRIENTS, NUTRIENT_MAP, random} from '../game-utils.js'

export default class Game2 {
  constructor() {
    const game = document.getElementById('game2')
    const question = document.createElement('p')
    const food = document.createElement('div')
    const options = document.createElement('div')
    const result = document.createElement('div')
    const answer = document.createElement('p')
    const info = document.createElement('p')
    const play = document.createElement('button')

    question.id = 'question'
    food.id = 'food'
    options.id = 'options'
    result.id = 'result'
    answer.id = 'answer'
    info.id = 'info'
    play.id = 'new-game'
    play.type = 'button'

    for (let i = 0; i < 3; i++) {
      let option = document.createElement('div')
      options.append(option)
    }
    play.append('Ny omgång')
    result.append(answer, info, play)
    game.append(question, food, options, result)

    this.elements = {
      question : question,
      food : food,
      answer : answer,
      info : info
    }
    this.options = document.getElementById('options').children
    this.play = play
    this.select = this.select.bind(this)
  }

  new_game(response) {
    Object.values(this.elements).forEach(element => element.replaceChildren())
    for (const option of this.options) {
      option.className = ''
      option.replaceChildren()
      option.addEventListener('click', this.select)
    }
    this.elements.answer.className = ''
    this.play.style.display = 'none'

    this.food = this.extract_relevant(response)
    this.set_question(this.food.nutrient)
    this.insert_food(this.food)
    this.correct = this.set_options(this.food.value)

    setTimeout(() => {
      document.querySelector('#food > div').classList.add('show')
    }, 300)
  }

  extract_relevant(response) {
    let nutrient
    let value = 0
    while (value < 1) {
      nutrient = random(NUTRIENTS)
      value = response.nutrients[NUTRIENT_MAP[nutrient]]
      }

    return {
      label : response.label,
      nutrient : nutrient,
      value : value,
      image : response.image
    }
  }

  set_question(nutrient) {
    const macro = document.createElement('span')
    macro.classList.add(nutrient)
    macro.append(nutrient)

    nutrient == 'kalorier' ?
    this.elements.question.append('Hur många ', macro, ' innehåller') :
    this.elements.question.append('Hur mycket ', macro, ' innehåller')
  }

  insert_food(food) {
    const div = document.createElement('div')
    div.classList.add('hide')
    const image = document.createElement('img')
    const label = document.createElement('p')

    image.src = food.image
    image.alt = ''
    label.append(`${food.label} ?`)
    div.append(image, label)
    this.elements.food.append(div)
  }

  set_options(value) {
    let selections
    let correct_index
    const pm = value / 4

    switch (Math.random() * 3 | 0) {
      case 0:
        selections = [value, value + pm, value + 2 * pm]
        correct_index = 0
        break
      case 1:
        selections = [value - pm, value, value + pm]
        correct_index = 1
        break
      case 2:
        selections = [value - 2 * pm, value - pm, value]
        correct_index = 2
    }

    selections.forEach((selection, i) => {
      this.options[i].append(Number(selection.toFixed(1)))
      this.options[i].classList.add('active-two')
    })

    return correct_index
  }

  select(evt) {
    for (const option of this.options) {
      option.removeEventListener('click', this.select)
      option.className = ''
    }

    const selected = evt.currentTarget
    const options = this.options
    const correct = options[this.correct]
    const wrong_string = `${this.food.label} innehåller ${this.food.value}`

    correct.classList.add('right')
    if (selected != correct) {
      selected.classList.add('wrong')
      this.elements.answer.append('Fel!')
      this.elements.answer.classList.add('wrong-info')
      this.elements.info.append(
        this.food.nutrient === 'kalorier' ?
          `${wrong_string} kalorier.`
          :
          `${wrong_string} gram ${this.food.nutrient}.`
      )
    } else {
      this.elements.answer.classList.add('right-info')
      this.elements.answer.append('Rätt!')
    }

    this.play.style.display = 'block'
    }
}

