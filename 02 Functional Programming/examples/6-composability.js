const ingredients = ["🐮", "🥔", "🐔", "🌽"]

const poop = ingredients
    .map(cook) // → [🍔, 🍟, 🍗, 🍿]
    .filter(isVegetarian) // → [🍟, 🍿]
    .reduce(eat) // → 💩

function cook() {
    /**/
}

function isVegetarian() {
    /**/
}

function eat() {
    /**/
}
