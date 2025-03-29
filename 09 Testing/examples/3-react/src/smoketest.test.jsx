import React from "react"
import ReactDOM from "react-dom/client"
import Game from "./Game"

it("renders without crashing", () => {
    const root = ReactDOM.createRoot(document.createElement("div"))
    root.render(<Game />)
})
