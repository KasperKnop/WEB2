# 02 Exercises: Functional Programming in JS

## 1. Squaring Integers

Create a pure function that returns a new array containing the squares of only the positive integers when an array of real numbers is passed to it.

Your function should not use any kind of `for` or `while` loops or the `forEach` method, but you may use any combination of `map`, `filter` and `reduce`.

```js
function squareList(array) {
    // Your code here.
}

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2])
console.log(squaredIntegers)
// → [25, 9]
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>You will need to <code>filter</code> the array for positive integers first (decimals are not integers). Afterwards you can <code>map</code> the values in the array. Remember the composability of higher order functions</p>
<p>This exercise can also be solved using only <code>reduce</code></p>
<details>
<summary>Display solution...</summary>

```js
function squareList(array) {
    return array.filter(x => x > 0 && x % 1 === 0).map(x => x * x)
}

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2])
console.log(squaredIntegers)
// → [25, 9]
```

</details>
</details>
</blockquote>

## 2. Flattening

Use the `reduce` method in combination with the `concat` method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.

```js
let arrays = [[1, 2, 3], [4, 5], [6]]
// Your code here.
// → [1, 2, 3, 4, 5, 6]
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Remember that <code>reduce</code> produces a single value, so the second argument to <code>reduce</code> - the initial value - should be an empty array.</p>
<details>
<summary>Display solution...</summary>

```js
let arrays = [[1, 2, 3], [4, 5], [6]]

console.log(arrays.reduce((flat, current) => flat.concat(current), []))
// → [1, 2, 3, 4, 5, 6]
```

</details>
</details>
</blockquote>

## 3. Your Own loop

Write a higher-order function `loop` that provides something like a `for` loop statement. It takes a value, a test function, an update function, and a body function. Each iteration, it first runs the test function on the current loop value and stops if that returns false. Then it calls the body function, giving it the current value. Finally, it calls the update function to create a new value and starts from the beginning.

When defining the function, you can use a regular loop to do the actual looping.

```js
// Your code here.

loop(
    3,
    n => n > 0,
    n => n - 1,
    console.log
)
// → 3
// → 2
// → 1
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Remember the structure of a <code>for</code> loop</p>

```js
for ([initialExpression]; [conditionExpression]; [incrementExpression]) {
    //statement
}
```

<details>
<summary>Display solution...</summary>

```js
function loop(start, test, update, body) {
    for (let i = start; test(i); i = update(i)) {
        body(i)
    }
}

loop(
    3,
    n => n > 0,
    n => n - 1,
    console.log
)
// → 3
// → 2
// → 1
```

</details>
</details>
</blockquote>

## 4. Alphabetical Sorting

The `sort` method sorts the elements of an array according to an optional callback function:

```js
const numbers = [1, 5, 2, 3, 4]

numbers.sort((a, b) => a - b)

console.log(numbers)
// → [1, 2, 3, 4, 5]
```

Note that the array is sorted in place, and no copy is made. It is an impure function.

JavaScript's default sorting method is by string Unicode point value, which may return unexpected results. Therefore, it is encouraged to provide a function to specify how to sort the array items. When such a function is supplied, the array elements are sorted according to the return value of the function: If it returns a value less than 0 for two elements `a` and `b`, then `a` will come before `b`. If it returns a value greater than 0 for two elements `a` and `b`, then b will come before `a`. If it returns a value equal to 0 for two elements `a` and `b`, then `a` and `b` will remain unchanged.

Use the `sort` method to write a _pure_ function that produces a new alphabetically sorted array.

```js
function alphabeticalOrder(array) {
    // Your code here.
}

const letters = ["a", "d", "c", "a", "z", "g"]

console.log(alphabeticalOrder(letters))
// → ["a", "a", "c", "d", "g", "z"]
console.log(letters)
// → [ "a", "d", "c", "a", "z", "g"]
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Since we are writing a pure function we must avoid the side effects caused by <code>sort</code>. Start by copying the array. A simple way to do this is by using the spread syntax combined with an array literal.</p>
<details>
<summary>Display solution...</summary>

```js
function alphabeticalOrder(array) {
    return [...array].sort((a, b) => (a === b ? 0 : a < b ? -1 : 1))
}

const letters = ["a", "d", "c", "a", "z", "g"]

console.log(alphabeticalOrder(letters))
// → ["a", "a", "c", "d", "g", "z"]
console.log(letters)
// → [ "a", "d", "c", "a", "z", "g"]
```

</details>
</details>
</blockquote>

## 5. Composing a URL

As we have learned, `reduce`, is a powerful method used to reduce problems to simpler forms. From computing averages to sorting, any array operation can be achieved by applying it. Recall that `map` and `filter` are special cases of reduce.

However, this exercise you should try to solve without using any higher order functions.

Many content management sites (CMS) have the titles of a post added to part of the URL for simple bookmarking purposes. For example `"Learn Functional Programmin In JavaScript"` would result in `.../learn-functional-programming-in-javascript`.

Fill in the `urlSlug` function so it converts a string `title` and returns the hyphenated version for the URL:

-   The input is a string with spaces and title-cased words
-   The output is a string with the spaces between words replaced by a hyphen (`-`)
-   The output should be all lower-cased letters
-   The output should not have any spaces

```js
function urlSlug(title) {
    // Your code here.
}

console.log(urlSlug("A Mind Needs Books Like A Sword Needs A Whetstone"))
// → a-mind-needs-books-like-a-sword-needs-a-whetstone
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>The string method <code>split</code> can be used to split a string into substrings and store them in an array. Conversely, the array method <code>join</code> creates a string concatenating all of the elements in an array.
<details>
<summary>Display solution...</summary>

```js
function urlSlug(title) {
    return title.toLowerCase().trim().split(" ").join("-")
}

console.log(urlSlug("A Mind Needs Books Like A Sword Needs A Whetstone"))
// → a-mind-needs-books-like-a-sword-needs-a-whetstone
```

</details>
</details>
</blockquote>

## 6. Everything

Analogous to the `some` method, arrays also have an `every` method. This one returns true when the given function returns true for _every_ element in the array. In a way, `some` is a version of the `||` operator that acts on arrays, and `every` is like the `&&` operator.

Implement `every` as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the `some` method.

```js
function every(array, test) {
    // Your code here.
}

console.log(every([1, 3, 5], n => n < 10))
// → true
console.log(every([2, 4, 16], n => n < 10))
// → false
console.log(every([], n => n < 10))
// → true
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Like the <code>&&</code> operator, the <code>every</code> method can stop evaluating further elements as soon as it has found one that doesn’t match. So the loop-based version can jump out of the loop—with <code>break</code> or <code>return</code>—as soon as it runs into an element for which the predicate function returns false. If the loop runs to its end without finding such an element, we know that all elements matched and we should return true.</p>
<p>To build <code>every</code> on top of <code>some</code>, we can apply <em>De Morgan’s laws</em>, which state that <code>a && b</code> equals <code>!(!a || !b)</code>. This can be generalized to arrays, where all elements in the array match if there is no element in the array that does not match.</p>
<details>
<summary>Display solution...</summary>

```js
function every(array, predicate) {
    for (let element of array) {
        if (!predicate(element)) return false
    }
    return true
}

function every2(array, predicate) {
    return !array.some(element => !predicate(element))
}

console.log(every([1, 3, 5], n => n < 10))
// → true
console.log(every([2, 4, 16], n => n < 10))
// → false
console.log(every([], n => n < 10))
// → true
```

</details>
</details>
</blockquote>

##

<sub><sup><em>
Exercise 1 & 4-5 are created with inspiration from [FreeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp). Licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
<br>
Exercise 2-3 & 6 are created by Marijn Haverbeke, [Eloquent JavaScript](https://eloquentjavascript.net/). Licensed under [CC BY-NC 3.0](https://creativecommons.org/licenses/by-nc/3.0/)
</em></sup></sub>
