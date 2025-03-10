import { useState, useEffect } from "react"

export default function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log("useEffect called")
        return () => console.log("cleanup")
    }, [count])

    return <button onClick={() => setCount(count + 1)}>Increment</button>
}
