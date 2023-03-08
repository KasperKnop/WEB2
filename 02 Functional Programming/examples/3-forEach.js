const pokemon = [
    { name: "Pikachu", type: "electric", hp: 35 },
    { name: "Charmander", type: "fire", hp: 39 },
    { name: "Squirtle", type: "water", hp: 44 },
    { name: "Jigglypuff", type: "normal", hp: 115 },
    { name: "Bulbasaur", type: "grass", hp: 45 },
    { name: "Vulpix", type: "fire", hp: 38 },
    { name: "Growlithe", type: "fire", hp: 55 },
]

//Imperative
for (let i = 0; i < pokemon.length; i++) {
    console.log(pokemon[i].name)
}

//With HOF
pokemon.forEach(pokemon => console.log(pokemon))
