import { it, expect } from "vitest"
import { add } from "../calc.js"

it("sums numbers", () => {
    expect(add(2, 2)).toBe(4)
})
