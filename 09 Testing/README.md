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

Write a test for a `capitalize` function that takes a string and returns it with the first character capitalized. Then write the code to pass the test.

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

Write a test for a `reverseString` function that takes a string and returns a reversed copy of the string. Then write the code to pass the test.

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

## 4.

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

## 5.

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

## 6.

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
