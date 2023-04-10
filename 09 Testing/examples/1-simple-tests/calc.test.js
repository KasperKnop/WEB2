import { add } from "./calc.js"

function test(label, body) {
    if (!body()) console.log(`Failed: ${label}`)
}

test("two plus two", () => {
    return add(2, 2) === 4
})

test("0 plus 0", () => {
    return add(0, 0) === 0
})
