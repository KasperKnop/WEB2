function urlSlug(title) {
    return title.toLowerCase().trim().split(" ").join("-")
}

console.log(urlSlug("A Mind Needs Books Like A Sword Needs A Whetstone"))
// → a-mind-needs-books-like-a-sword-needs-a-whetstone

//notice - All primitives are immutable, so we dont have to be concerned with copying for the function to be pure

//notice when you are working with a string and when you are working with an array
