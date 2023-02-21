// Constructor functions
function Dog(name, age) {
    this.name = name
    this.age = age
}

Dog.prototype.bark = () => "WUFF"

const dog = new Dog("Sam", 2)

console.log(dog.bark()) // → WUFF
