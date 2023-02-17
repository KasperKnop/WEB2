# 02 Exercises: Functional Programming

## 1. Squaring Integers

Create a pure function that returns a new array containing the squares of only the positive integers when an array of real numbers is passed to it.

Your function should make use of `map` and `filter` instead of any `for` or `while` loops or `forEach`.

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

Use the `reduce` method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.

```js
let arrays = [[1, 2, 3], [4, 5], [6]]
// Your code here.
// → [1, 2, 3, 4, 5, 6]
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Remember that <code>reduce</code> produces a single value, so the second argument to <code>reduce</code> - the initial value - should be an empty array.</p>
<p>For merging arrays you can either use the <code>concat</code> method or the spread syntax combined with an array literal. 
<details>
<summary>Display solution...</summary>

```js
let arrays = [[1, 2, 3], [4, 5], [6]]

console.log(arrays.reduce((flat, current) => [...flat, ...current], []))
// → [1, 2, 3, 4, 5, 6]
```

</details>
</details>
</blockquote>

## 3. Your Own Loop

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
<p>Since we are writing a pure function we must avoid the side effects caused by <code>sort</code>. This means that we can only call <code>sort</code> on a copy of the array that is passed to the function.</p>
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

## 5. From Title To URL

Many content management sites (CMS) have the titles of a post added to part of the URL for simple bookmarking purposes. For example `"Learn Functional Programmin In JavaScript"` would result in `.../learn-functional-programming-in-javascript`.

Fill in the pure function, `urlSlug`, so it converts a string `title` and returns the hyphenated version for the URL:

-   The input is a string with spaces and title-cased words
-   The output is a string with the spaces between words replaced by a hyphen (`-`)
-   The output should be all lower-cased letters
-   The output should not have any spaces

Are higher order functions useful here? Can you solve the exercise without them?

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
<p>Since we are passed a string primitive, which is immutable, we do not have to be concerned with input mutation.</p>
<p>The string method <code>split</code> can be used to split a string into substrings and store them in an array. Conversely, the array method <code>join</code> creates a string concatenating all the elements in an array.</p>
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

## 6. Something

The `some` method works with arrays to check if _any_ element passes a particular test. It returns a Boolean value - `true` if any of the values meet the criteria, `false` if not.

Use the `some` method inside the `checkPositive` function to check if any element in the array is positive. The function should return a Boolean value.

```js
function checkPositive(array) {
    // Your code here.
}

console.log(checkPositive([1, 2, 3, -4, 5]))
// → true
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>As an example, the following code would check if any element in the <code>numbers</code> array is less than 10:</p>

```js
const numbers = [10, 50, 8, 220, 110, 11]

console.log(numbers.some(e => e < 10))
// → true
```

<details>
<summary>Display solution...</summary>

```js
function checkPositive(array) {
    return array.some(e => e > 0)
}

console.log(checkPositive([1, 2, 3, -4, 5]))
// → true
```

</details>
</details>
</blockquote>

## 7. Everything

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

## 8. Script Transformations

For the next exercises you will need to place the [`scripts.js`](https://raw.githubusercontent.com/KasperKnop/WEB2/main/02%20Functional%20Programming/scripts.js) file next to your solutions and run your solutions using _node.js_. This file contains a SCRIPTS constant with an array of objects, each of which describes a script:

```js
{
  name: "Coptic",
  ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
  direction: "ltr",
  year: -200,
  living: false,
  link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
}
```

Write a function that takes an array of scripts as input and returns the name of the oldest script that is not dead.

```js
require("./scripts.js")

function oldestLivingScript(scripts) {
    // Your code here.
}

console.log(oldestLivingScript(SCRIPTS))
// → Han
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>As you can see, each script object has a <code>year</code> property and a <code>living</code> property that you can use. Finding the oldest script can be done with <code>reduce</code>.</p>

<details>
<summary>Display solution...</summary>

```js
require("./scripts.js")

function oldestLivingScript(scripts) {
    return scripts.filter(s => s.living).reduce((res, s) => (res.year < s.year ? res : s))
}

console.log(oldestLivingScript(SCRIPTS).name)
// → Han
```

</details>
</details>
</blockquote>

## 9. The Multi-Tool Of Array Transformations

Use `filter` and `map` to write a function that takes an array of scripts as input and returns an array with the names of the scripts with a right to left directionality.

Since `reduce` can be used to express any array transformation, rewrite the function using it instead of `filter` and `map`.

```js
require("./scripts.js")

function rtlScriptNames(scripts) {
    // Your code here.
}

console.log(rtlScriptNames(SCRIPTS))
// → [ "Adlam", "Arabic", "Imperial Aramaic", ... ]
```

<blockquote>
<details>
<summary>Display hints...</summary>

<p>As you can see, each script object has a <code>direction</code> property that can be <code>"ltr"</code> (left to right), <code>"rtl"</code> (right to left), or <code>"ttb"</code> (top to bottom).</p>
<p>Here is the function using filter and map:</p>

```js
function rtlScriptNames(scripts) {
    const rtlScripts = scripts.filter(s => s.direction === "rtl")
    return rtlScripts.map(s => s.name)
}
```

<p>Remember that the <code>reduce</code> function takes an optional second argument - the initial value of the accumulator. Since both <code>filter</code> and <code>map</code> produce an array, your <code>reduce</code> functions should do the same. Array literals combined with the spread syntax might come in handy here.</p>

<details>
<summary>Display solution...</summary>

```js
require("./scripts.js")

function rtlScriptNames(scripts) {
    return scripts.reduce((res, s) => (s.direction === "rtl" ? [...res, s.name] : [...res]), [])
}

console.log(rtlScriptNames(SCRIPTS)) // → [ "Adlam", "Arabic", "Imperial Aramaic", ... ]
```

</details>
</details>
</blockquote>

## 10. Dominant Writing Direction

Write a function that computes the dominant writing direction in a string of text.

The dominant direction is the direction of a majority of the characters that have a script associated with them. The `characterScript` and `countBy` functions defined in the code below are probably useful here.

```js
require("./scripts.js")

function dominantDirection(text) {
    // Your code here.
}

function countBy(items, groupName) {
    let counts = []
    for (let item of items) {
        let name = groupName(item)
        let known = counts.findIndex(c => c.name === name)
        if (known === -1) {
            counts.push({ name, count: 1 })
        } else {
            counts[known].count++
        }
    }
    return counts
}

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (
            script.ranges.some(([from, to]) => {
                return code >= from && code < to
            })
        ) {
            return script
        }
    }
    return null
}

console.log(dominantDirection("Hello!"))
// → ltr
console.log(dominantDirection("Hey, مساء الخير"))
// → rtl
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Your solution might look a lot like the first half of this example:</p>

```js
function textScripts(text) {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))
        return script ? script.name : "none"
    }).filter(({ name }) => name != "none")

    let total = scripts.reduce((n, { count }) => n + count, 0)
    if (total == 0) return "No scripts found"

    return scripts
        .map(({ name, count }) => {
            return `${Math.round((count * 100) / total)}% ${name}`
        })
        .join(", ")
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'))
// → 61% Han, 22% Latin, 17% Cyrillic
```

<p>You also have to count characters by a criterion based on <code>characterScript</code> and then filter out the part of the result that refers to uninteresting (script-less) characters.</p>
<p>Finding the direction with the highest character count can be done with <code>reduce</code>.</p>
<details>
<summary>Display solution...</summary>

```js
require("./scripts.js")

function dominantDirection(text) {
    let counted = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))
        return script ? script.direction : "none"
    }).filter(({ name }) => name !== "none")

    if (counted.length === 0) return "ltr"

    return counted.reduce((a, b) => (a.count > b.count ? a : b)).name
}

function countBy(items, groupName) {
    let counts = []
    for (let item of items) {
        let name = groupName(item)
        let known = counts.findIndex(c => c.name === name)
        if (known === -1) {
            counts.push({ name, count: 1 })
        } else {
            counts[known].count++
        }
    }
    return counts
}

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (
            script.ranges.some(([from, to]) => {
                return code >= from && code < to
            })
        ) {
            return script
        }
    }
    return null
}

console.log(dominantDirection("Hello!"))
// → ltr
console.log(dominantDirection("Hey, مساء الخير"))
// → rtl
```

</details>
</details>
</blockquote>

##

<sub><sup><em>
Exercise 1 & 4-6 are created with inspiration from [FreeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp). Licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
<br>
Exercise 2, 3, 7 & 10 are created by Marijn Haverbeke, [Eloquent JavaScript](https://eloquentjavascript.net/). Licensed under [CC BY-NC 3.0](https://creativecommons.org/licenses/by-nc/3.0/)
</em></sup></sub>
