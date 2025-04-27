interface User {
    name: string
    age: number
}

function greet(user: User) {
    return "Hello " + user.name
}

let user = { name: "Joel", age: 54 }

console.log(greet(user))
