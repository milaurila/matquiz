import foods from './food-items.js'

function random_food(foods) {
    return foods[foods.length * Math.random() | 0]
}
