const pokemon = [
    { name: "Pikachu", type: "electric", hp: 35 },
    { name: "Charmander", type: "fire", hp: 39 },
    { name: "Squirtle", type: "water", hp: 44 },
    { name: "Jigglypuff", type: "normal", hp: 115 },
    { name: "Bulbasaur", type: "grass", hp: 45 },
    { name: "Vulpix", type: "fire", hp: 38 },
    { name: "Growlithe", type: "fire", hp: 55 },
]

//Imperative filter and map for fire pokemon names
let result = []
for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].type === "fire") result.push(pokemon[i].name)
}

//Functional style filter
function isFire(pokemon) {
    return pokemon.type === "fire"
}

//map
const firePokemonNames = pokemon.filter(isFire).map(p => p.name)
