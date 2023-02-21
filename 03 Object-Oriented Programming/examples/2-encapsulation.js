// Encapsulation
function createPerson(name, age) {
    return { age, getName: () => name }
}

const person = createPerson("Kasper", 34)

console.log(person.name) // → undefined
console.log(person.getName()) // → Kasper
