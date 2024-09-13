import {NUTRIENTS, MODE, NUTRIENT_MAP, random} from '../game-utils.js'

export default class Game1 {
  constructor() {
    const game = document.getElementById('game1')
    const question = document.createElement('p')
    const options = document.createElement('div')
    const result = document.createElement('div')
    const answer = document.createElement('p')
    const info = document.createElement('p')
    const play = document.createElement('button')

    question.id = 'question'
    options.id = 'options'
    result.id = 'result'
    answer.id = 'answer'
    info.id = 'info'
    play.id = 'new-game'
    play.type = 'button'

    question.append('Välj livsmedlet med ')
    play.append('Ny omgång')
    result.append(answer, info, play)
    game.append(question, options, result)

    this.elements = {
      options : options,
      answer : answer,
      info : info
    }
    this.play = play
    this.question = question
  }

  new_game(responses) {
    this.nutrient = random(NUTRIENTS)
    this.mode = random(MODE)

    this.play.style.display = 'none'
    Object.values(this.elements).forEach(element => element.replaceChildren())
    this.elements.answer.className = ''

    this.set_question(this.nutrient, this.mode)
    this.options = this.extract_relevant(responses, this.nutrient)
    this.insert_options(this.options)
    this.correct = this.get_correct(this.options, this.mode)
    this.select = this.select.bind(this)

    for (const div of this.elements.options.children) {
      div.addEventListener('click', this.select)
      div.classList.add('active')
    }
  }

  fade_in(collection, delay) {
    let i = 1
    for (const item of collection) {
      setTimeout(() => item.classList.add('show'), i * delay)
      i++
    }
  }

  set_question(nutrient, mode) {
    document.querySelectorAll('#question span').forEach(span => span.remove())

    const macro = document.createElement('span')
    macro.classList.add(nutrient, 'hide')
    macro.append(nutrient)

    const minmax = document.createElement('span')
    minmax.classList.add('minmax', 'hide')
    minmax.append(mode)

    this.question.append(minmax, ' ', macro)
    this.fade_in([minmax, macro], 100)
  }

  extract_relevant(responses, nutrient) {
    const nut_key = NUTRIENT_MAP[nutrient]
    const relevant = []

    responses.forEach(response =>
      relevant.push(
        {
          label : response.label,
          value : response.nutrients[nut_key],
          image : response.image
        }
      )
    )

    return relevant
  }

  get_correct(options, mode) {
    return mode === 'mest' ?
      options.reduce((max, current) => max.value > current.value ? max : current)
      :
      options.reduce((min, current) => min.value < current.value ? min : current)
  }

  insert_options(options) {
    for (const option of options) {
      const div = document.createElement('div')
      const image = document.createElement('img')
      const label = document.createElement('p')

      image.src = option.image
      image.alt = ''
      label.append(option.label)
      div.append(image, label)
      div.classList.add('hide')
      this.elements.options.append(div)
    }

    this.fade_in(this.elements.options.children, 400)
  }

  select(evt) {
    let correct = true
    const selected_div = evt.currentTarget
    const selected_label = selected_div.children[1].innerText

    for (const div of this.elements.options.children) {
      div.removeEventListener('click', this.select)
      div.className = ''
      if (div.children[1].innerText === this.correct.label) {
        div.classList.add('right')
        document.querySelector('.right').classList.add('yay')
      }
    }

    if (selected_label !== this.correct.label) {
      selected_div.classList.add('wrong')
      correct = false
    }

    let selected_option
    for (const option of this.options) {
      if (option.label === selected_label) {
        selected_option = option
      }
    }

    correct ? this.right() : this.wrong(selected_option)

    this.play.style.display = 'block'
  }

  right() {
    const correct_string = `${this.correct.label} innehåller ${this.correct.value}`

    this.elements.answer.classList.add('right-info')
    this.elements.answer.append('Rätt!')

    this.elements.info.append(
      this.nutrient === 'kalorier' ?
        `${correct_string} kalorier.` : `${correct_string} gram ${this.nutrient}.`
    )
  }

  wrong(selected) {
    const selected_string = `${selected.label} innehåller ${selected.value}`
    const correct_string = `${this.correct.label} innehåller ${this.correct.value}`

    this.elements.answer.classList.add('wrong-info')
    this.elements.answer.append('Fel!')

    this.elements.info.append(
      this.nutrient === 'kalorier' ?
        `${selected_string} kalorier. ${correct_string} kalorier.`
        :
        `${selected_string} gram ${this.nutrient}.
         ${correct_string} gram ${this.nutrient}.`
    )
  }
}

