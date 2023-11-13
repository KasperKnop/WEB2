interface User {
    name: string
    age: string
}

function greet(user: User) {
    return "Hello " + user.name
}

let user = { name: "Joel", age: "54" }

console.log(greet(user))
