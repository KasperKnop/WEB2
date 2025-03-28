import { useState, useEffect } from "react"

export default function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        setTimeout(count => count++, 1000)
        console.log("useEffect called")
    }, [])

    return <button onClick={() => setCount(count + 1)}>Increment</button>
}
