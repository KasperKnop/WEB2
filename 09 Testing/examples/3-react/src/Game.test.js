import { render, screen, fireEvent } from "@testing-library/react"
import Game from "./Game"

it("X wins with diagonal line", () => {
    const { container } = render(<Game />)
    const squares = container.querySelectorAll(".square")

    fireEvent.click(squares[0])
    fireEvent.click(squares[1])
    fireEvent.click(squares[4])
    fireEvent.click(squares[2])
    fireEvent.click(squares[8])

    expect(screen.getByText("Winner: X")).toBeInTheDocument()
})
