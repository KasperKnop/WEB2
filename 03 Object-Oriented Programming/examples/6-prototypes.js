// Exampe of delegation
let obj = {}

console.log(obj.toString())

// Setting your own prototype
const animal = { name: "Sam" }
const dog = { sound: "wuff" }

Object.setPrototypeOf(dog, animal)
console.log(Object.getPrototypeOf(dog) == animal) // true

console.log(dog.name) // Sam

// Dynamic inheritance
animal.name = "Sammi"
console.log(dog.name) // → Sammi
