//Imperative
let greeting = "Hi, "
let user = "Kasper"
greeting += user
console.log(greeting) // → "Hi, Kasper"

//functional
function greet(user) {
    return "Hi, " + user
}
console.log(greet("Kasper")) // → "Hi, Kasper"
