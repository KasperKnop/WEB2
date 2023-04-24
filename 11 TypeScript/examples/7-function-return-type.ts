interface Product {
    id: number
    name: string
}

const products: Product[] = [
    { id: 1, name: "milk" },
    { id: 2, name: "sugar" },
    { id: 3, name: "flour" },
]

function getProductById(id: number) {
    return products.find(p => p.id === id)
}

const myProduct = getProductById(2)
