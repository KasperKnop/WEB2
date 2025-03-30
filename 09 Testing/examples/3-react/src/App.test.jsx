import { render, screen } from "@testing-library/react"
import App from "./App"

it("renders hello text", () => {
    render(<App />)
    const greeting = screen.getByText("Hello")
    expect(greeting).toBeInTheDocument()
})
