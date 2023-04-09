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
it("reverses the string", () => {
    expect(reverseString("123")).toBe("321")
})

function reverseString(string) {
    return [...string].reverse().join("")
}
```

</details>
</details>
</blockquote>

## 4. Testing a Calculator

Write tests for a `calculator` object that contains functions for the basic operations: `add`, `subtract`, `divide`, and `multiply`. Each of these functions should take two numbers and return the correct calculation. Write the code to pass the tests.

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

## 5. Caesar Cipher

Write a test for a `caesarCipher` function that takes a string and a shift factor. The function returns a copy of the string with each character “shifted” down the alphabet using the shift factor. E.g.:

```js
caesarCipher("defend the east wall of the castle", 1)
// → efgfoe uif fbtu xbmm pg uif dbtumf
```

Write the code to pass the tests.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Learn more about how a Caesar cipher works on <a href="http://practicalcryptography.com/ciphers/caesar-cipher/">this website</a>.</p>
<p>Don’t forget to test wrapping from z to a.</p>
<p>Don’t forget to test keeping the same case.</p>
<p>Don’t forget to test punctuation!</p>
<p>You may want to split the final function for the implementation into a few smaller functions. One concept of testing is that you don’t need to explicitly test every function you write - just the functions that is executing the behavior that you are interested in. So in this case you only need tests for the final <code>caesarCipher</code> function. If it works as expected you can rest assured that your smaller helper functions are doing what they’re supposed to, and you prevent testing implementation details, that will tightly couple your implementation and tests together.</p>
<details>
<summary>Display solution...</summary>

```js

```

</details>
</details>
</blockquote>

## 6. Array Analyzer

Write a test for an `analyzeArray` function that takes an array of numbers and returns an object with the following properties: average, min, max, and length. Write the code to pass the tests.

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

## 7.

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
