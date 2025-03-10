import { useMemo } from "react"

export default function App() {
    //Imagine a very long list!
    const names = ["Joel", "Ellie", "Bill", "Frank"]

    return <List names={names} />
}

function List({ names }) {
    const sortedNames = useMemo(() => [...names].sort(), [names])

    return (
        <ol>
            {sortedNames.map(n => (
                <li key={n}>{n}</li>
            ))}
        </ol>
    )
}
