//Used to demonstrate how the stack works
const baz = () => console.log("Hi class!")
const bar = () => baz()
const foo = () => bar()

foo()
