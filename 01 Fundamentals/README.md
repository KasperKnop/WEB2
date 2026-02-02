# 01 Exercises: Fundamentals

## 1. Set Up Your Development Environment

[Download](https://nodejs.org/en/) and install _Node.js_. This will allow you to run your JavaScript exercises without a browser. When installed, run `node myExercise.js` from a CLI to run the program (note that your exercise has to be within the present working directory of the CLI for this to work). Later in the course we will see even more uses for Node.js.

It is also recommended that you [download](https://code.visualstudio.com/download) and install _Visual Studio Code_. However, the choice of editor/IDE is entirely up to you. Here are some extensions, that you might consider using as well:

1. [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) - Run your code faster without a command-line interface
2. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Popular opinionated code formatter
3. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) - Useful later in the course for launching a local server with live reload

## 2. Looping A Triangle

Write a loop that makes seven calls to `console.log` to output the following triangle:

> \#  
> \#\#  
> \#\#\#  
> \#\#\#\#  
> \#\#\#\#\#  
> \#\#\#\#\#\#  
> \#\#\#\#\#\#\#

It may be useful to know that you can find the length of a string by writing `.length` after it.

```js
let abc = "abc"
console.log(abc.length)
// → 3
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>You can start with a program that prints out the numbers 1 to 7.</p>
<p>Now consider the equivalence between numbers and strings of hash characters. You can go from 1 to 2 by adding 1 (<code>+= 1</code>). You can go from <code>"#"</code> to <code>"##"</code> by adding a character (<code>+= "#"</code>). Thus, your solution can closely follow the number-printing program.</p>
<details>
<summary>Display solution...</summary>

```js
for (let line = "#"; line.length < 8; line += "#") {
    console.log(line)
}
```

</details>
</details>
</blockquote>

## 3. FizzBuzz

Write a program that uses `console.log` to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print `"Fizz"` instead of the number, and for numbers divisible by 5 (and not 3), print `"Buzz"` instead.

When you have that working, modify your program to print `"FizzBuzz"` for numbers that are divisible by both 3 and 5 (and still print `"Fizz"` or `"Buzz"` for numbers divisible by only one of those).

(This is actually an interview question that has been claimed to weed out a significant percentage of programmer candidates. So if you solved it, your labor market value just went up.)

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Going over the numbers is clearly a looping job, and selecting what to print is a matter of conditional execution. Remember the trick of using the remainder (<code>%</code>) operator for checking whether a number is divisible by another number (has a remainder of zero). </p>
<p>In the first version, there are three possible outcomes for every number, so you’ll have to create an <code>if/else if/else</code> chain. </p>
<p>The second version of the program has a straightforward solution and a clever one. The simple solution is to add another conditional “branch” to precisely test the given condition. For the clever solution, build up a string containing the word or words to output and print either this word or the number if there is no word, potentially by making good use of the <code>||</code> operator.</p>
<details>
<summary>Display solution...</summary>

```js
for (let n = 1; n <= 100; n++) {
    let output = ""
    if (n % 3 == 0) output += "Fizz"
    if (n % 5 == 0) output += "Buzz"
    console.log(output || n)
}
```

</details>
</details>

</blockquote>

## 4. Minimum

Write a function `min` that takes two arguments and returns their minimum.

```js
// Your code here.

console.log(min(0, 10))
// → 0
console.log(min(0, -10))
// → -10
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>A function may contain multiple <code>return</code> statements.</p>
<details>
<summary>Display solution...</summary>

```js
function min(a, b) {
    if (a < b) return a
    else return b
}

console.log(min(0, 10))
// → 0
console.log(min(0, -10))
// → -10
```

</details>
</details>
</blockquote>

## 5. Bean Counting

You can get the Nth character, or letter, from a string by writing `"string"[N]`. The returned value will be a string containing only one character (for example, `"b"`). The first character has position 0, which causes the last one to be found at position `string.length - 1`. In other words, a two-character string has length 2, and its characters have positions 0 and 1.

Write a function `countBs` that takes a string as its only argument and returns a number that indicates how many uppercase “B” characters there are in the string.

Next, write a function called `countChar` that behaves like `countBs`, except it takes a second argument that indicates the character that is to be counted (rather than counting only uppercase “B” characters). Rewrite `countBs` to make use of this new function.

```js
// Your code here.

console.log(countBs("BBC"))
// → 2
console.log(countChar("kakkerlak", "k"))
// → 4
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Your function will need a loop that looks at every character in the string. It can run an index from zero to one below its length (<code>< string.length</code>). If the character at the current position is the same as the one the function is looking for, it adds 1 to a counter variable. Once the loop has finished, the counter can be returned.</p>
<p>Take care to make all the bindings used in the function <em>local</em> to the function by properly declaring them with the <code>let</code> or <code>const</code> keyword.</p>
<details>
<summary>Display solution...</summary>

```js
function countChar(string, ch) {
    let counted = 0
    for (let i = 0; i < string.length; i++) {
        if (string[i] == ch) {
            counted += 1
        }
    }
    return counted
}

function countBs(string) {
    return countChar(string, "B")
}

console.log(countBs("BBC"))
// → 2
console.log(countChar("kakkerlak", "k"))
// → 4
```

</details>
</details>
</blockquote>

## 6. The Sum Of Range

The following is an elegant way to compute the sum of a range of numbers

```js
console.log(sum(range(1, 10)))
```

Write a `range` function that takes two arguments, `start` and `end`, and returns an array containing all the numbers from `start` up to (and including) `end`.

Next, write a `sum` function that takes an array of numbers and returns the sum of these numbers. Run the example program and verify that it returns 55.

As a bonus assignment, modify your `range` function to take an optional third argument that indicates the “step” value used when building the array. If no step is given, the elements go up by increments of one, corresponding to the old behavior. The function call `range(1, 10, 2)` should return `[1, 3, 5, 7, 9]`. Make sure it also works with negative step values so that `range(5, 2, -1)` produces `[5, 4, 3, 2]`.

```js
// Your code here.

console.log(range(1, 10))
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1))
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)))
// → 55
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Building up an array is most easily done by first initializing a binding to <code>[]</code> (a fresh, empty array) and repeatedly calling its <code>push</code> method to add a value. Don’t forget to return the array at the end of the function.</p>
<p>Since the end boundary is inclusive, you’ll need to use the <code><=</code> operator rather than <code><</code> to check for the end of your loop.</p>
<p>The step parameter can be an optional parameter that defaults (using the <code>=</code> operator) to 1.</p>
<p>Having <code>range</code> understand negative step values is probably best done by writing two separate loops—one for counting up and one for counting down—because the comparison that checks whether the loop is finished needs to be <code>>=</code> rather than <code><=</code> when counting downward.</p>
<p>It might also be worthwhile to use a different default step, namely, -1, when the end of the range is smaller than the start. That way, <code>range(5, 2)</code> returns something meaningful, rather than getting stuck in an infinite loop. It is possible to refer to previous parameters in the default value of a parameter.</p>
<details>
<summary>Display solution...</summary>

```js
function range(start, end, step = start < end ? 1 : -1) {
    let array = []

    if (step > 0) {
        for (let i = start; i <= end; i += step) array.push(i)
    } else {
        for (let i = start; i >= end; i += step) array.push(i)
    }
    return array
}

function sum(array) {
    let total = 0
    for (let value of array) {
        total += value
    }
    return total
}

console.log(range(1, 10))
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1))
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)))
// → 55
```

</details>
</details>
</blockquote>

## 7. Currying

The arity of a function is the number of arguments it requires. Currying a function means converting a function of N arity into N functions of arity 1. In other words, it restructures a function so it takes one argument, then returns another function that takes the next argument, and so on. This is useful in your program if you can't supply all the arguments to a function at one time. You can save each function call into a variable, which will hold the returned function reference that takes the next argument when it's available.

Here is an example:

```js
function unCurried(x, y) {
    return x + y
}

function curried(x) {
    return function (y) {
        return x + y
    }
}

console.log(curried(1)(2))
// → 3
```

Modify the `range` function from the previous exercise. If it is called with just a `start` argument, another function will be returned that expects just the `end` argument.

```js
// Your code here.

let rangeFrom3To = range(3)
let rangeFrom7To = range(7)

console.log(rangeFrom3To(3))
// → [3]
console.log(rangeFrom3To(8))
// → [3,4,5,6,7,8]
console.log(rangeFrom7To(9))
// → [7,8,9]
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>This task takes advantage of closures.</p>
<p>Parameters default to <code>undefined</code> if no argument is given. Use this to do a check in the beginning of your <code>range</code> function. If no <code>end</code> argument was passed, return a new function that calls the <code>range</code> function.</p>
<details>
<summary>Display solution...</summary>

```js
function range(start, end, step = start < end ? 1 : -1) {
    if (end === undefined) return end => range(start, end)
    let array = []

    if (step > 0) {
        for (let i = start; i <= end; i += step) array.push(i)
    } else {
        for (let i = start; i >= end; i += step) array.push(i)
    }
    return array
}

let rangeFrom3To = range(3)
let rangeFrom7To = range(7)

console.log(rangeFrom3To(3))
// → [3]
console.log(rangeFrom3To(8))
// → [3,4,5,6,7,8]
console.log(rangeFrom7To(9))
// → [7,8,9]
```

</details>
</details>
</blockquote>

## 8. Reversing An Array

Arrays have a `reverse` method that changes the array by inverting the order in which its elements appear. For this exercise, write two functions, `reverseArray` and `reverseArrayInPlace`. The first, `reverseArray`, takes an array as argument and produces a _new_ array that has the same elements in the inverse order. The second, `reverseArrayInPlace`, does what the `reverse` method does: it _modifies_ the array given as argument by reversing its elements. Neither may use the standard `reverse` method.

Taking side effects and pure functions into consideration, which variant do you expect to be useful in more situations? Which one runs faster?

```js
// Your code here.

console.log(reverseArray(["A", "B", "C"]))
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5]
reverseArrayInPlace(arrayValue)
console.log(arrayValue)
// → [5, 4, 3, 2, 1]
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>There are two obvious ways to implement <code>reverseArray</code>. The first is to simply go over the input array from front to back and use the <code>unshift</code> method on the new array to insert each element at its start. The second is to loop over the input array backwards and use the <code>push</code> method. Iterating over an array backwards requires a (somewhat awkward) for specification, like <code>(let i = array.length - 1; i >= 0; i--)</code>.</p>
<p>Reversing the array in place is harder. You have to be careful not to overwrite elements that you will later need. Using <code>reverseArray</code> or otherwise copying the whole array (<code>array.slice(0)</code> is a good way to copy an array) works but is cheating.</p>
<p>The trick is to <em>swap</em> the first and last elements, then the second and second-to-last, and so on. You can do this by looping over half the length of the array (use <code>Math.floor</code> to round down—you don’t need to touch the middle element in an array with an odd number of elements) and swapping the element at position <code>i</code> with the one at position <code>array.length - 1 - i</code>. You can use a local binding to briefly hold on to one of the elements, overwrite that one with its mirror image, and then put the value from the local binding in the place where the mirror image used to be.</p>
<details>
<summary>Display solution...</summary>

```js
function reverseArray(array) {
    let output = []
    for (let i = array.length - 1; i >= 0; i--) {
        output.push(array[i])
    }
    return output
}

function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let old = array[i]
        array[i] = array[array.length - 1 - i]
        array[array.length - 1 - i] = old
    }
    return array
}

console.log(reverseArray(["A", "B", "C"]))
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5]
reverseArrayInPlace(arrayValue)
console.log(arrayValue)
// → [5, 4, 3, 2, 1]
```

</details>
</details>
</blockquote>

## 9. A List

Objects, as generic blobs of values, can be used to build all sorts of data structures. A common data structure is the list (not to be confused with array). A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.

```js
let list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null,
        },
    },
}
```

The resulting objects form a chain, like this:

![Linked List](/01%20Fundamentals/fig1.svg)

A nice thing about lists is that they can share parts of their structure. For example, if I create two new values `{value: 0, rest: list}` and `{value: -1, rest: list}` (with `list` referring to the binding defined earlier), they are both independent lists, but they share the structure that makes up their last three elements. The original list is also still a valid three-element list.

Write a function `arrayToList` that builds up a list structure like the one shown when given `[1, 2, 3]` as argument. Also write a `listToArray` function that produces an array from a list. Then add a helper function `prepend`, which takes an element and a list and creates a new list that adds the element to the front of the input list, and `nth`, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element) or `undefined` when there is no such element.

If you haven’t already, also write a recursive version of `nth`.

```js
// Your code here.

console.log(arrayToList([10, 20]))
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])))
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)))
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1))
// → 20
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Building up a list is easier when done back to front. So <code>arrayToList</code> could iterate over the array backwards (see the previous exercise) and, for each element, add an object to the list. You can use a local binding to hold the part of the list that was built so far and use an assignment like <code>list = {value: X, rest: list}</code> to add an element.</p>
<p>To run over a list (in <code>listToArray</code> and <code>nth</code>), a <code>for</code> loop specification like this can be used:</p>

```js
for (let node = list; node; node = node.rest) {}
```

<p>Can you see how that works? Every iteration of the loop, <code>node</code> points to the current sublist, and the body can read its <code>value</code> property to get the current element. At the end of an iteration, <code>node</code> moves to the next sublist. When that is null, we have reached the end of the list, and the loop is finished.</p>
<p>The recursive version of <code>nth</code> will, similarly, look at an ever smaller part of the “tail” of the list and at the same time count down the index until it reaches zero, at which point it can return the <code>value</code> property of the node it is looking at. To get the zeroth element of a list, you simply take the <code>value</code> property of its head node. To get element N + 1, you take the Nth element of the list that’s in this list’s <code>rest</code> property.</p>
<details>
<summary>Display solution...</summary>

```js
function arrayToList(array) {
    let list = null
    for (let i = array.length - 1; i >= 0; i--) {
        list = { value: array[i], rest: list }
    }
    return list
}

function listToArray(list) {
    let array = []
    for (let node = list; node; node = node.rest) {
        array.push(node.value)
    }
    return array
}

function prepend(value, list) {
    return { value, rest: list }
}

function nth(list, n) {
    if (!list) return undefined
    else if (n == 0) return list.value
    else return nth(list.rest, n - 1)
}

console.log(arrayToList([10, 20]))
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])))
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)))
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1))
// → 20
```

</details>
</details>
</blockquote>

## 10. Deep Comparison

The `==` operator compares objects by identity. But sometimes you’d prefer to compare the values of their actual properties.

Write a function `deepEqual` that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to `deepEqual`.

To find out whether values should be compared directly (use the `===` operator for that) or have their properties compared, you can use the `typeof` operator. If it produces `"object"` for both values, you should do a deep comparison. But you have to take one silly exception into account: because of a historical accident, `typeof null` also produces `"object"`.

The `Object.keys` function will be useful when you need to go over the properties of objects to compare them.

```js
// Your code here.

let obj = { here: { is: "an" }, object: 2 }
console.log(deepEqual(obj, obj))
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }))
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }))
// → true
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Your test for whether you are dealing with a real object will look something like <code>typeof x == "object" && x != null</code>. Be careful to compare properties only when <em>both</em> arguments are objects. In all other cases you can just immediately return the result of applying <code>===</code>.</p>
<p>Use <code>Object.keys</code> to go over the properties. You need to test whether both objects have the same set of property names and whether those properties have identical values. One way to do that is to ensure that both objects have the same number of properties (the lengths of the property lists are the same). And then, when looping over one of the object’s properties to compare them, always first make sure the other actually has a property by that name. If they have the same number of properties and all properties in one also exist in the other, they have the same set of property names.</p>
<p>Returning the correct value from the function is best done by immediately returning false when a mismatch is found and returning true at the end of the function.</p>
<details>
<summary>Display solution...</summary>

```js
function deepEqual(a, b) {
    if (a === b) return true

    if (a == null || typeof a != "object" || b == null || typeof b != "object") return false

    let keysA = Object.keys(a),
        keysB = Object.keys(b)

    if (keysA.length != keysB.length) return false

    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false
    }

    return true
}

let obj = { here: { is: "an" }, object: 2 }
console.log(deepEqual(obj, obj))
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }))
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }))
// → true
```

</details>
</details>
</blockquote>

##

<sub><sup><em>Exercise 2-6 & 8-10 are created by Marijn Haverbeke, [Eloquent JavaScript](https://eloquentjavascript.net/). Licensed under [CC BY-NC 3.0](https://creativecommons.org/licenses/by-nc/3.0/)</em><sup><sub>
