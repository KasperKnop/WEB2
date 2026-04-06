import { useState, useEffect } from "react"

export default function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log("Effect called")
    }, [count])

    return <button onClick={() => setCount(count + 1)}>Increment {count}</button>
}
