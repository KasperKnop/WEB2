// Classes
class Dog {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    bark() {
        return "WUFF"
    }
}

const dog = new Dog("Sam", 2)

console.log(dog.bark()) // → WUFF
