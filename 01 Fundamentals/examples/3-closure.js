function createGreeting(msg) {
    return name => console.log(msg + ", " + name)
}

let sayHello = createGreeting("Hello")
let sayHi = createGreeting("Hi")

sayHello("Joel") // → "Hello, Joel"
sayHi("Ellie") // → "Hi, Ellie"
