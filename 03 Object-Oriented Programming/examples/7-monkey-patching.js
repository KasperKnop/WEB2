// Monkey patching
const array = [1, 2, 3, 4]

Array.prototype.map = () => "METHOD REPLACED!"

console.log(array.map(e => e * e)) // → METHOD REPLACED!
