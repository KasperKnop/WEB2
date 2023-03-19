class User {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

function printName(user) {
    console.log(`User's name is ${user.name}`)
}

function printAge(user) {
    console.log(`User is ${user.age} years old`)
}

//Exporting can also be done in-line
export default User
export { printName, printAge }
