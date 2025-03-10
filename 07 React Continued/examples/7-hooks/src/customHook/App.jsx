import { useToggle } from "./useToggle"

export default function App() {
    const [isOn, toggleIsOn] = useToggle()
    return <button onClick={toggleIsOn}>{isOn ? "ON" : "OFF"}</button>
}
