export {NUTRIENTS, MODE, NUTRIENT_MAP, random}

const NUTRIENTS = [
    'kalorier',
    'protein',
    'fett',
    'kolhydrater'
]

const MODE = [
    'mest',
    'minst'
]

const NUTRIENT_MAP = {
    'kalorier' : 'ENERC_KCAL',
    'protein' : 'PROCNT',
    'fett' : 'FAT',
    'kolhydrater' : 'CHOCDF'
}

function random(array) {
    return array[array.length * Math.random() | 0]
}

