import { useRef } from "react"

export default function App() {
    const inputRef = useRef(null)
    const handleClick = () => inputRef.current.focus()
    return (
        <>
            <input ref={inputRef} />
            <button onClick={handleClick}>Focus input</button>
        </>
    )
}
