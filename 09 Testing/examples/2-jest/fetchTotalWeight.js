export async function fetchTotalWeight() {
    const responses = await Promise.all([
        getPokemon("pikachu"),
        getPokemon("bulbasaur"),
        getPokemon("charmander"),
        getPokemon("squirtle"),
        getPokemon("butterfree"),
        getPokemon("pidgeotto"),
    ])
    const promises = responses.map(response => response.json())
    const pokemonList = await Promise.all(promises)
    return pokemonList.reduce((weightSum, { weight }) => weightSum + weight, 0) / 10
}

function getPokemon(name) {
    return fetch("https://pokeapi.co/api/v2/pokemon/" + name)
}
