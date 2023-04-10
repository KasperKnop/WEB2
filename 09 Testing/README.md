# 09 Exercises: Testing

## 1. Set Up Your Testing Environment

For the first exercises we will only be using _Jest_. To use _Jest_, run:

```
npm init
npm i -D jest
```

Make sure `test` property of `scripts` in the `package.json` executes `jest`.

By default, the current version of _Jest_ will not recognize ES6 import statements. If you want to use ES6 modules, you must do the following:

1. Install the @babel/preset-env package:

```
npm i -D @babel/preset-env
```

2. npm i -D @babel/preset-env

```
{ "presets": ["@babel/preset-env"] }
```

You can now run all test.js files with `npm run test`. If you are using _Create React App_, everything will already be set up for you.

## 2. Capitalizing a String

Write a test for a `capitalize` function that takes a string and returns it with the first character capitalized. Write the code to pass the test.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>You can write a test with the <code>it</code> function, which takes two arguments - a description of the test and the test function itself. This test function should contain an <code>expect</code> function paired with a matcher to assert specific behaviour of your code. <a href="https://jestjs.io/docs/getting-started">Learn more here</a></p>
<details>
<summary>Display solution...</summary>

```js
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

it("capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello")
})
```

</details>
</details>
</blockquote>

## 3. Reversing a String

Write a test for a `reverseString` function that takes a string and returns a reversed copy of the string. Write the code to pass the test.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>You already know how to reverse an array. It might be helpful to convert the string into an array and then back into a string once you have reversed it.</p>
<details>
<summary>Display solution...</summary>

```js
function reverseString(string) {
    return [...string].reverse().join("")
}

it("reverses the string", () => {
    expect(reverseString("123")).toBe("321")
})
```

</details>
</details>
</blockquote>

## 4. Testing a Calculator

Write tests for a `calculator` object that contains functions for the basic operations: `add`, `subtract`, `divide`, and `multiply`. Each of these functions should take two numbers and return the correct calculation. Write the code to pass the tests.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>If you are testing decimal numbers, it might be worth noting that intuitive equality comparisons often fail, because arithmetic on decimal (base 10) values often have rounding errors in limited precision binary (base 2) representation. For example, <code>0.2 + 0.1</code> is actually <code>0.30000000000000004</code>. You can use <code>toBeCloseTo</code> to compare floating point numbers for approximate equality.</p>
<details>
<summary>Display solution...</summary>

```js
const calculator = {
    add: (x, y) => x + y,
    subtract: (x, y) => x - y,
    divide: (x, y) => x / y,
    multiply: (x, y) => x * y,
}

it("adds two numbers", () => {
    expect(calculator.add(2, 2)).toBe(4)
})

it("adds decimal numbers", () => {
    expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3)
})

it("subtracts two numbers", () => {
    expect(calculator.subtract(2, 1)).toBe(1)
})

it("divides two numbers", () => {
    expect(calculator.divide(6, 2)).toBe(3)
})

it("divides with zero", () => {
    expect(calculator.divide(2, 0)).toBe(Infinity)
})

it("multiplies two numbers", () => {
    expect(calculator.multiply(5, 2)).toBe(10)
})
```

</details>
</details>
</blockquote>

## 5. Array Analyzer

Write a test for an `analyzeArray` function that takes an array of numbers and returns an object with the following properties: `average`, `min`, `max`, and `length`. Write the code to pass the tests.

```js
const object = analyzeArray([1, 8, 3, 4, 2, 6])
console.log(object)
// → { average: 4, min: 1, max: 8, length: 6 }
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Remember to handle edge cases such as empty arrays or arrays with non-number elements.</p>
<details>
<summary>Display solution...</summary>

```js
function analyzeArray(array) {
    const length = array.length

    if (length === 0) return { average: undefined, min: undefined, max: undefined, length }

    const min = Math.min(...array)
    const max = Math.max(...array)
    const sum = array.reduce((acc, curr) => acc + curr)
    const average = sum / length

    if (Number.isNaN(average)) return { average, min: undefined, max: undefined, length }

    return { average, min, max, length }
}

it("returns the correct average", () => {
    const array = [1, 8, 3, 4, 2, 6]
    const result = analyzeArray(array)
    expect(result.average).toBe(4)
})

it("returns the correct min", () => {
    const array = [1, 8, 3, 4, 2, 6]
    const result = analyzeArray(array)
    expect(result.min).toBe(1)
})

it("returns the correct max", () => {
    const array = [1, 8, 3, 4, 2, 6]
    const result = analyzeArray(array)
    expect(result.max).toBe(8)
})

it("returns the correct length", () => {
    const array = [1, 8, 3, 4, 2, 6]
    const result = analyzeArray(array)
    expect(result.length).toBe(6)
})

it("returns an object with length 0 if given an empty array", () => {
    const array = []
    const result = analyzeArray(array)
    const expected = {
        average: undefined,
        min: undefined,
        max: undefined,
        length: 0,
    }
    expect(result).toEqual(expected)
})

it("returns an object with NaN for average if given an array with non-number elements", () => {
    const array = ["a", "b", 2]
    const result = analyzeArray(array)
    const expected = {
        average: NaN,
        min: undefined,
        max: undefined,
        length: 3,
    }
    expect(result).toEqual(expected)
})
```

</details>
</details>
</blockquote>

## 6. Caesar Cipher

Write tests for a `caesarCipher` function that takes a string and a shift factor. The function returns a copy of the string with each character “shifted” down the alphabet using the shift factor. E.g.:

```js
caesarCipher("defend the east wall of the castle", 1)
// → efgfoe uif fbtu xbmm pg uif dbtumf
```

Write the code to pass the tests.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Learn more about how a Caesar cipher works on <a href="http://practicalcryptography.com/ciphers/caesar-cipher/">this website</a>.</p>
<p>The exercise might be easier if you apply test driven development, testing and then implement one thing at a time. E.g.:</p>
<ol>
<li>Test a simple shift of abc to bcd.</li>
<li>Test with other characters than letters.</li>
<li>Test wrapping from z to a.</li>
<li>Test keeping the same case.</li>
<li>Works with negative shift values.</li>
</ol>
<p>You can create a string containing the alphabet and use <code>indexOf</code> to find out what number a character is in the alphabet (or you can work directly with UTF-16 code units using <code>charCodeAt</code>). If <code>indexOf</code> returns <code>-1</code> it is not a letter in your alphabet. To wrap from z to a you can use modulus and the length of the alphabet.</p>

<details>
<summary>Display solution...</summary>

```js
function caesarCipher(string, shift) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return [...string]
        .map(char => {
            let charIndex = alphabet.indexOf(char.toLowerCase())
            if (charIndex === -1) return char
            let shiftedIndex = (charIndex + shift) % alphabet.length
            if (shiftedIndex < 0) shiftedIndex += alphabet.length
            return char === char.toUpperCase() ? alphabet[shiftedIndex].toUpperCase() : alphabet[shiftedIndex]
        })
        .join("")
}

it("shifts abc once", () => {
    expect(caesarCipher("abc", 1)).toBe("bcd")
})

it("works with punctuation", () => {
    expect(caesarCipher("ab.c", 1)).toBe("bc.d")
})

it("wraps from z to a", () => {
    expect(caesarCipher("xyz", 2)).toBe("zab")
})

it("maintains capitalization", () => {
    expect(caesarCipher("aBc", 1)).toBe("bCd")
    expect(caesarCipher("ABC", 1)).not.toBe("bcd")
})

it("works with negativ shift", () => {
    expect(caesarCipher("abc", -1)).toBe("zab")
})
```

</details>
</details>
</blockquote>

## 7. React Testing Library

<blockquote>
<details>
<summary>Display hints...</summary>
<p></p>
<details>
<summary>Display solution...</summary>

```js

```

</details>
</details>
</blockquote>

## 8. Mocking

<blockquote>
<details>
<summary>Display hints...</summary>
<p></p>
<details>
<summary>Display solution...</summary>

```js

```

</details>
</details>
</blockquote>

## 9. Performance Testing

<blockquote>
<details>
<summary>Display hints...</summary>
<p></p>
<details>
<summary>Display solution...</summary>

```js

```

</details>
</details>
</blockquote>

## 10. Testing Assignments

<blockquote>
<details>
<summary>Display hints...</summary>
<p></p>
<details>
<summary>Display solution...</summary>

```js

```

</details>
</details>
</blockquote>

<sub><sup>_Exercise 1-6 are created with inspiration from [The Odin Project](https://www.theodinproject.com), created by Erik Trautman. Licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)_<sup><sub>
