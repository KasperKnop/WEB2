import { useToggle } from "./useToggle.js"

export default function App() {
    const [isOn, toggleIsOn] = useToggle()
    return <button onClick={toggleIsOn}>{isOn ? "ON" : "OFF"}</button>
}
