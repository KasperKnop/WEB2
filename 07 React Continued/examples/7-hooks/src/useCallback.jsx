import { useState, useCallback, useEffect } from "react"

export default function App() {
    const [count, setCount] = useState(0)

    const getData = useCallback(() => "HI!", [])

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <Child getData={getData}></Child>
        </>
    )
}

function Child({ getData }) {
    useEffect(() => {
        console.log(getData())
    }, [getData])

    return <h1>CHILD</h1>
}
