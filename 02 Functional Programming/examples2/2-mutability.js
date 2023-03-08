//Objects are mutable
const animal = { type: "dog" }
animal.type = "cat"

//Primitive values are not
const animal2 = "dog"
animal2 = "cat" //ERROR - Assignment to constant variable

//Records & Tuples - objects and arrays as primitive values (not in JS yet!)
//"#" in front of object or array literal
const animal3 = #{ type: "dog" }
animal3.type = "cat" //ERROR - Assignment to constant variable
