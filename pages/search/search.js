import {get_food} from '../../api/api.js'

document.querySelector('form').addEventListener('submit', search)
const result = document.getElementById('result')
const input = document.querySelector('input')
const info = document.createElement('p')
const table = document.createElement('table')

result.append(info, table)

async function search(evt) {
  evt.preventDefault()

  table.replaceChildren()
  info.replaceChildren()

  const result = await get_food(input.value.trim())
  result === -1 ? no_result() : create_table(result)
}

function no_result() {
  info.replaceChildren('Din sökning gav tyvärr inga träffar.')
}

function create_table(result) {
  input.value = ''
  const headers = ['Livsmedel', 'Kalorier', 'Protein', 'Fett', 'Kolhydrater']
  const values = Object.values(result.nutrients).slice(0, 4)

  for (let i = 0; i < 5; i++) {
    const row = table.insertRow()
    const header = document.createElement('th')
    row.append(header)
    const value = row.insertCell()
    header.append(headers[i])
    if (i === 0) {
      value.append(result.label)
    } else {
      value.append(values[i - 1])
    }
  }
}

