# 03 Exercises: Object-Oriented Programming

## 1. Using Composition

Class diagrams are good at conveying object-oriented design, but given JavaScripts multiple approaches to object creation,
and a rather distinct inheritance model, their implementation is not as straightforward as in more traditional object-oriented
programming languages like Java & C#.

Implement the Java class diagram below using factory functions in JavaScript.

![Java Class Diagram](/03%20Object-Oriented%20Programming/fig1.svg)

```js
// Your code here.

console.log(createCircle(createPoint(1, 2), 4).toString())
// → Circle(Center: [1,2], Radius: 4)
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Since you are using factory functions, you should try to avoid using the <code>this</code> keyword.</p>
<p>Likewise, remember that factory functions can take advantage of closures for implementing private members of an object.</p>
<p>You should also make sure that <code>Circle</code> uses the <code>toString</code> method of the <code>Point</code> object.</p>
<details>
<summary>Display solution...</summary>

```js
function createCircle(center, radius) {
    return {
        getCenterX: () => center.getX(),
        getCenterY: () => center.getY(),
        getRadius: () => radius,
        moveCenterTo: (x, y) => center.moveTo(x, y),
        toString: () => `Circle(Center: ${center.toString()}, Radius: ${radius})`,
    }
}

function createPoint(x, y) {
    return {
        getX: () => x,
        getY: () => y,
        moveTo(newX, newY) {
            x = newX
            y = newY
        },
        toString: () => `[${x},${y}]`,
    }
}

console.log(createCircle(createPoint(1, 2), 4).toString())
// → Circle(Center: [1,2], Radius: 4)
```

</details>
</details>
</blockquote>

## 2. Combining Programming Styles

Using the solution from previous exercise, create an array of circles. Use the arrays `map` method to create an array with the radius of each circle.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>In this exercise you are combining object-oriented and functional programming styles!</p>

<details>
<summary>Display solution...</summary>

```js
const circles = [createCircle(createPoint(1, 2), 7), createCircle(createPoint(2, 4), 5), createCircle(createPoint(2, 4), 3)]
const radii = circles.map(circle => circle.getRadius())
console.log(radii)
// → [7, 5, 3]
```

</details>
</details>
</blockquote>

## 3. Method Overloading

We want to add an overloaded constructor to the circle from the previous exercises:

`Circle(x: double, y: double, radius: double)`

But JavaScript does not support method overloading like Java and C#. Use the code below to implement an alternative to a traditional overloaded constructor.

```js
// Your code here.

console.log(createCircle({ x: 2, y: 2, radius: 4 }).getCenterX())
// → 2
console.log(createCircle({ center: createPoint(2, 2), radius: 4 }).getCenterX())
// → 2
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>You can solve this issue by using the <code>arguments</code> object, checking for <code>undefined</code> or through object destructuring (as suggested).</p>

<details>
<summary>Display solution...</summary>

```js
function createCircle({ x, y, center = createPoint(x, y), radius }) {
    return {
        getCenterX: () => center.getX(),
        getCenterY: () => center.getY(),
        getRadius: () => radius,
        moveCenterTo: (x, y) => center.moveTo(x, y),
        toString: () => `Circle(Center: ${center.toString()}, Radius: ${radius})`,
    }
}

function createPoint(x, y) {
    return {
        getX: () => x,
        getY: () => y,
        moveTo(newX, newY) {
            x = newX
            y = newY
        },
        toString: () => `[${x},${y}]`,
    }
}

console.log(createCircle({ x: 2, y: 2, radius: 4 }).getCenterX())
// → 2
console.log(createCircle({ center: createPoint(2, 2), radius: 4 }).getCenterX())
// → 2
```

</details>
</details>
</blockquote>

## 4. Extending Objects

Implement the Java class diagram below using factory functions in JavaScript.

![Java Class Diagram](/03%20Object-Oriented%20Programming/fig2.svg)

```js
// Your code here.

const santa = createEmployee({ name: "Santa Clause", age: 1752, salary: 0 })
console.log(santa.toString())
// → Name: Santa Clause, Age: 1752, Salary: 0
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>There are multiple approaches to this exercise, but you should still try to avoid using the <code>this</code> keyword. Your employee factory could create a person as the first thing, which can be used throughout its methods.</p>
<p>You can use the spread syntax to combine objects. If properties have the same name, the one closest to the end of the object will override the other.</p>

<details>
<summary>Display solution...</summary>

```js
function createPerson(name, age) {
    return {
        getName: () => name,
        setName: newName => (name = newName),
        getAge: () => age,
        setAge: newAge => (age = newAge),
        toString: () => `Name: ${name}, Age: ${age}`,
        equals: person => person.getName() === name && person.getAge() === age,
    }
}

function createEmployee({ name, age, salary }) {
    const person = createPerson(name, age)

    return {
        ...person,
        getSalary: () => salary,
        setSalary: newSalary => (salary = newSalary),
        toString: () => `${person.toString()}, Salary: ${salary}`,
        equals: employee => person.equals(employee) && employee.getSalary() === salary,
    }
}

const santa = createEmployee({ name: "Santa Clause", age: 1752, salary: 0 })
console.log(santa.toString())
// → Name: Santa Clause, Age: 1752, Salary: 0
```

</details>
</details>
</blockquote>

## 5. Another Approach

Implement the Java class diagram from _exercise 1_ using classes in JavaScript.

```js
// Your code here.

console.log(new Circle(new Point(1, 2), 4).toString())
// → Circle(Center: [1,2], Radius: 4)
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>For this exercise you cannot avoid using <code>this</code>. Remember that you can put <code>#</code> in front of any field to make it private, and that it is mandatory to declare private fields up-front.</p>

<details>
<summary>Display solution...</summary>

```js
class Circle {
    #center
    #radius

    constructor(center, radius) {
        this.#center = center
        this.#radius = radius
    }

    getCenterX() {
        return this.#center.getX()
    }

    getCenterY() {
        return this.#center.getY()
    }

    getRadius() {
        return this.#radius
    }

    moveCenterTo(x, y) {
        this.#center.moveTo(x, y)
    }

    toString() {
        return `Circle(Center: ${this.#center.toString()}, Radius: ${this.#radius})`
    }
}

class Point {
    #x
    #y

    constructor(x, y) {
        this.#x = x
        this.#y = y
    }

    getX() {
        return this.#x
    }

    getY() {
        return this.#y
    }

    moveTo(x, y) {
        this.#x = x
        this.#y = y
    }

    toString() {
        return `[${this.#x},${this.#y}]`
    }
}

console.log(new Circle(new Point(1, 2), 4).toString())
// → Circle(Center: [1,2], Radius: 4)
```

</details>
</details>
</blockquote>

## 6. Extending Classes

Implement the Java class diagram from _exercise 4_ using classes in JavaScript.

```js
// Your code here.

const santa = new Employee({ name: "Santa Clause", age: 1752, salary: 0 })
console.log(santa.toString())
// → Name: Santa Clause, Age: 1752, Salary: 0
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Remember that you can use the <code>super</code> keyword to call the constructor of the parent class and to access the parent's properties and methods.</p>

<details>
<summary>Display solution...</summary>

```js
class Person {
    #name
    #age

    constructor(name, age) {
        this.#name = name
        this.#age = age
    }

    getName() {
        return this.#name
    }

    setName(name) {
        this.#name = name
    }

    getAge() {
        return this.#age
    }

    setAge(age) {
        this.#age = age
    }

    toString() {
        return `Name: ${this.#name}, Age: ${this.#age}`
    }

    equals(person) {
        return person.getName() === this.#name && person.getAge() === this.#age
    }
}

class Employee extends Person {
    #salary

    constructor({ name, age, salary }) {
        super(name, age)
        this.#salary = salary
    }

    getSalary() {
        return this.#salary
    }

    setSalary(salary) {
        this.#salary = salary
    }

    toString() {
        return `${super.toString()}, Salary: ${this.#salary}`
    }

    equals(employee) {
        return super.equals(employee) && employee.getSalary() === this.#salary
    }
}

const santa = new Employee({ name: "Santa Clause", age: 1752, salary: 0 })
console.log(santa.toString())
// → Name: Santa Clause, Age: 1752, Salary: 0
```

</details>
</details>
</blockquote>

## 7. A Vector Type

Write a class `Vec` that represents a vector in two-dimensional space. It takes `x` and `y` parameters (numbers), which it should save to properties of the same name.

Give the `Vec` prototype two methods, `plus` and `minus`, that take another vector as a parameter and return a new vector that has the sum or difference of the two vectors’ (`this` and the parameter) `x` and `y` values.

Add a getter property `length` to the prototype that computes the length of the vector—that is, the distance of the point (x, y) from the origin (0, 0).

```js
// Your code here.

console.log(new Vec(1, 2).plus(new Vec(2, 3)))
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)))
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length)
// → 5
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Adding a getter property to the constructor can be done by putting the word <code>get</code> before the method name. To compute the distance from (0, 0) to (x, y), you can use the Pythagorean theorem, which says that the square of the distance we are looking for is equal to the square of the x-coordinate plus the square of the y-coordinate. Thus, √(x2 + y2) is the number you want, and <code>Math.sqrt</code> is the way you compute a square root in JavaScript.</p>

<details>
<summary>Display solution...</summary>

```js
class Vec {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y)
    }

    minus(other) {
        return new Vec(this.x - other.x, this.y - other.y)
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)))
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)))
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length)
// → 5
```

</details>
</details>
</blockquote>

## 8. Borrowing A Method

An object’s `hasOwnProperty` can be used as a more robust alternative to the `in` operator when you want to ignore the prototype’s properties. But what if your object needs to include the word `"hasOwnProperty"`? You won’t be able to call that method anymore because the object’s own property hides the method value.

Can you think of a way to call `hasOwnProperty` on an object that has its own property by that name?

```js
let obj = { one: true, two: true, hasOwnProperty: true }

// Fix this call
console.log(obj.hasOwnProperty("one"))
// → true
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Remember that methods that exist on plain objects come from <code>Object.prototype</code>.</p>
<p>Also remember that you can call a function with a specific <code>this</code> binding by using its <code>call</code> method.</p>

<details>
<summary>Display solution...</summary>

```js
let obj = { one: true, two: true, hasOwnProperty: true }

console.log(Object.prototype.hasOwnProperty.call(obj, "one"))
// → true
```

</details>
</details>
</blockquote>

<sub><sup><em>Exercise 7 & 8 are created by Marijn Haverbeke, [Eloquent JavaScript](https://eloquentjavascript.net/). Licensed under [CC BY-NC 3.0](https://creativecommons.org/licenses/by-nc/3.0/)</em><sup><sub>
