import { fetchTotalWeight } from "./fetchTotalWeight"

it("returns total weight", async () => {
    const total = await fetchTotalWeight()
    expect(total).toBe(92.4)
})
