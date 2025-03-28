import { useState, useEffect } from "react"

export default function App() {
    return <PokemonImage name={"pikachu"} />
}

function PokemonImage({ name }) {
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        let ignore = false

        fetch("https://pokeapi.co/api/v2/pokemon/" + name)
            .then(response => response.json())
            .then(p => {
                if (!ignore) setPokemon(p)
            })

        return () => (ignore = true)
    }, [name])

    return <img src={pokemon?.sprites?.front_default} />
}
