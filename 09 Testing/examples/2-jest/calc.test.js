import { add } from "./calc.js"

it("adds two and two", () => {
    expect(add(2, 2)).toBe(4)
})

it("adds 0 and 0", () => {
    expect(add(0, 0)).toBe(0)
})
