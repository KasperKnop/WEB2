//Simple reduce example
const numbers = [10, 20, 30, 40, 50]

console.log(numbers.reduce(sum)) // → 150

function sum(result, element) {
    console.log(result) // → 10, 30, 60, 100
    return result + element
}

//Pokemon example
const pokemon = [
    { name: "Pikachu", type: "electric", hp: 35 },
    { name: "Charmander", type: "fire", hp: 39 },
    { name: "Squirtle", type: "water", hp: 44 },
    { name: "Jigglypuff", type: "normal", hp: 115 },
    { name: "Bulbasaur", type: "grass", hp: 45 },
    { name: "Vulpix", type: "fire", hp: 38 },
    { name: "Growlithe", type: "fire", hp: 55 },
]

//Imperative calculate total
let total = 0
for (let i = 0; i < pokemon.length; i++) {
    total += pokemon[i].hp
}

//Functional style
const totalHp = pokemon.reduce((total, { hp }) => total + hp, 0)
