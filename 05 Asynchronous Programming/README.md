# 05 Exercises: Asynchronous Programming

## 1. A Childhood Callback

[PokéAPI](https://pokeapi.co/) is a free RESTful Pokémon API, that serves data from the pokémon video game series.

Using `XMLHttpRequest`, write a function that retrieves a pokémon and prints its name to the console. You have to make an HTML page to test the function in the browser, since `XmlHttpRequest` does not exist natively in _Node.js_.

Extend the page to allow the user to search for a pokémon by id or name through an input field and a search button. The page should display the name, id, type(s) and an image (sprite) of the searched pokémon, as well as the status of the request.

Make sure the page fails gracefully if there are any issues with the asynchronous calls.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Take some time to familiarize yourself with the API. The endpoint for a specific pokémon is:</p>
<p><code>https://pokeapi.co/api/v2/pokemon/{pokemon-name-or-id}</code></p>
<p>The implementation will take advantage of callbacks from the <code>XMLHttpRequest</code> object. The <load>load</code> event is fired when an <code>XMLHttpRequest</code> transaction completes successfully.</p>
<p>You can extract the response through the <code>responseText</code> property on the <code>XMLHttpRequest</code> object and you can deserialize any JSON with <code>JSON.parse</code>.</p>
<p>Error handling has its own callback, but this does not cover any HTTP error status. You can check the status code through the <code>status</code> property on the XMLHttpRequest object.</p>
<details>
<summary>Display solution...</summary>

```html
<html>
    <head>
        <meta charset="UTF-8" />
        <title>A Callback To Childhood</title>
    </head>

    <body>
        <input type="text" />
        <button onclick="getPokemon(document.querySelector('input').value)">Submit</button>

        <p>Request status: <span id="message"></span></p>
        <div>
            <img width="96" height="96" />
            <p>Number: <span id="id"></span></p>
            <p>Name: <span id="name"></span></p>
            <p>Type: <span id="type"></span></p>
        </div>

        <script>
            function getPokemon(pokemon) {
                if (pokemon === "") return

                const xhr = new XMLHttpRequest()
                xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemon)
                xhr.onload = () => {
                    if (xhr.status == 200) {
                        document.querySelector("#message").innerText = "Success!"
                        const pkmn = JSON.parse(xhr.responseText)
                        document.querySelector("img").src = pkmn.sprites.front_default
                        document.querySelector("#id").innerText = pkmn.id
                        document.querySelector("#name").innerText = pkmn.name
                        const primaryType = pkmn.types[0].type.name
                        const secondaryType = pkmn.types[1]?.type.name
                        document.querySelector("#type").innerText = secondaryType ? `${primaryType}/${secondaryType}` : primaryType
                    } else {
                        displayError("Response was not OK!")
                    }
                }
                xhr.onerror = () => displayError("Network Error!")
                xhr.send()
            }

            function displayError(message) {
                document.querySelector("#message").innerText = message
                document.querySelector("#id").innerText = ""
                document.querySelector("#name").innerText = ""
                document.querySelector("img").src = ""
                document.querySelector("#type").innerText = ""
            }
        </script>
    </body>
</html>
```

</details>
</details>
</blockquote>

## 2. Converting To Promises

Implement the previous exercise using promises with `fetch` and `.then`.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Use the <code>json</code> method on the response object to convert the data to a JavaScript object.</p>
<p>Use the <code>catch</code> method on the <code>Promise</code> to handle any errors that may occur during the fetch, but remember that any HTTP error status has to be handled manually.</p>
<details>
<summary>Display solution...</summary>

```html
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Converting To Promises</title>
    </head>

    <body>
        <input type="text" />
        <button onclick="getPokemon(document.querySelector('input').value)">Submit</button>

        <p>Request status: <span id="message"></span></p>
        <div>
            <img width="96" height="96" />
            <p>Number: <span id="id"></span></p>
            <p>Name: <span id="name"></span></p>
            <p>Type: <span id="type"></span></p>
        </div>

        <script>
            function getPokemon(pokemon) {
                if (pokemon === "") return

                fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
                    .then(response => {
                        if (!response.ok) throw new Error("Response was not OK!")
                        document.querySelector("#message").innerText = "Success!"
                        return response.json()
                    })
                    .then(pkmn => {
                        document.querySelector("img").src = pkmn.sprites.front_default
                        document.querySelector("#id").innerText = pkmn.id
                        document.querySelector("#name").innerText = pkmn.name
                        const primaryType = pkmn.types[0].type.name
                        const secondaryType = pkmn.types[1]?.type.name
                        document.querySelector("#type").innerText = secondaryType ? `${primaryType}/${secondaryType}` : primaryType
                    })
                    .catch(err => {
                        document.querySelector("#message").innerText = err
                        document.querySelector("#id").innerText = ""
                        document.querySelector("#name").innerText = ""
                        document.querySelector("img").src = ""
                        document.querySelector("#type").innerText = ""
                    })
            }
        </script>
    </body>
</html>
```

</details>
</details>
</blockquote>

## 3. Converting To Async/Await

Implement the previous exercise using `async`/`await`.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Remember to put the <code>async</code> keyword in front of the function so that you can <code>await</code> promises inside it.</p>
<p>The <code>json</code> method on the response object also returns a promise, so you have to make sure that you are awaiting that as well.</p>
<p>Since the code behaves in a more synchronous manner, you can use <code>try</code>/<code>catch</code> for error handling.</p>
<details>
<summary>Display solution...</summary>

```html
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Converting To Async/Await</title>
    </head>

    <body>
        <input type="text" />
        <button onclick="getPokemon(document.querySelector('input').value)">Submit</button>

        <p>Request status: <span id="message"></span></p>
        <div>
            <img width="96" height="96" />
            <p>Number: <span id="id"></span></p>
            <p>Name: <span id="name"></span></p>
            <p>Type: <span id="type"></span></p>
        </div>

        <script>
            async function getPokemon(pokemon) {
                if (pokemon === "") return

                try {
                    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
                    if (!response.ok) throw new Error("Response was not OK!")
                    document.querySelector("#message").innerText = "Success!"
                    const pkmn = await response.json()
                    document.querySelector("img").src = pkmn.sprites.front_default
                    document.querySelector("#id").innerText = pkmn.id
                    document.querySelector("#name").innerText = pkmn.name
                    const primaryType = pkmn.types[0].type.name
                    const secondaryType = pkmn.types[1]?.type.name
                    document.querySelector("#type").innerText = secondaryType ? `${primaryType}/${secondaryType}` : primaryType
                } catch (err) {
                    document.querySelector("#message").innerText = err
                    document.querySelector("#id").innerText = ""
                    document.querySelector("#name").innerText = ""
                    document.querySelector("img").src = ""
                    document.querySelector("#type").innerText = ""
                }
            }
        </script>
    </body>
</html>
```

</details>
</details>
</blockquote>

## 4. Replicating Fetch With XHR and Promises

Write your own `Promise`-returning function using `XMLHttpRequest`. Unlike `fetch` it should throw an error on any HTTP status code other than 200, and it should deserialize the response directly to a JavaScript object so that we don't have to call `json` on the response. Use it in your solution to the previous exercise.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Your function needs to return a <code>Promise</code>. Remember that the <code>Promise</code> constructur takes a function as argument, that itself has two arguments - one function for resolving the <code>Promise</code> and one function for rejecting it. You should use these functions together with the <code>XMLHttpRequest</code> callbacks to determine when the <code>Promise</code> is resolved or rejected.</p>
<details>
<summary>Display solution...</summary>

```html
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Replicating Fetch With XHR and Promises</title>
    </head>

    <body>
        <input type="text" />
        <button onclick="getPokemon(document.querySelector('input').value)">Submit</button>

        <p>Request status: <span id="message"></span></p>
        <div>
            <img width="96" height="96" />
            <p>Number: <span id="id"></span></p>
            <p>Name: <span id="name"></span></p>
            <p>Type: <span id="type"></span></p>
        </div>

        <script>
            async function getPokemon(pokemon) {
                if (pokemon === "") return
                try {
                    const pkmn = await fakeFetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
                    document.querySelector("#message").innerText = "Success!"
                    document.querySelector("img").src = pkmn.sprites.front_default
                    document.querySelector("#id").innerText = pkmn.id
                    document.querySelector("#name").innerText = pkmn.name
                    const primaryType = pkmn.types[0].type.name
                    const secondaryType = pkmn.types[1]?.type.name
                    document.querySelector("#type").innerText = secondaryType ? `${primaryType}/${secondaryType}` : primaryType
                } catch (err) {
                    document.querySelector("#message").innerText = err
                    document.querySelector("#id").innerText = ""
                    document.querySelector("#name").innerText = ""
                    document.querySelector("img").src = ""
                    document.querySelector("#type").innerText = ""
                }
            }

            function fakeFetch(url) {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest()
                    xhr.open("GET", url)
                    xhr.onload = () => {
                        if (xhr.status == 200) {
                            resolve(JSON.parse(xhr.responseText))
                        } else {
                            reject(new Error("Response was not OK!"))
                        }
                    }
                    xhr.onerror = () => reject(new Error("Network Error!"))
                    xhr.send()
                })
            }
        </script>
    </body>
</html>
```

</details>
</details>
</blockquote>

## 5. Pokéballs Are Magic

Carrying around a team of six pokémon should be hard work, but fortunately pokémon are weightless when they are inside a pokéball. Let’s calculate how much weight pokéballs helped Ash Ketchum carry around in his early adventures, when his team consisted of the following pokémon:

1. Pikachu
2. Bulbasaur
3. Charmander
4. Squirtle
5. Butterfree
6. Pidgeotto

In the `printTotalWeight` function below, use `Promise.all` to collect the result of all 6 network requests and print the total weight of the pokémon.

```html
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Pokéballs Are Magic</title>
    </head>

    <body onload="printTotalWeight()">
        <script>
            async function printTotalWeight() {
                // Your code here.

                console.log(totalWeight) // → 92.4
            }

            function getPokemon(name) {
                return fetch("https://pokeapi.co/api/v2/pokemon/" + name)
            }
        </script>
    </body>
</html>
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Remember that the API does not accept a pokémon name starting with a capital letter!</p>
<p>You can use <code>map</code> and <code>json</code> to convert the response into JavaScript objects, but since <code>json</code> returns a <code>Promise</code>, you will have to use <code>Promise.all</code> twice - once to retrieve the responses and again to retrieve the list of pokémon from the responses.</p>
<p>You can use <code>reduce</code> to reduce the list of pokémon into their total weight. To avoid using floating point numbers, the API returns the weight of a pokémon in hectogram(hg), which means you have to divide the result with 10 to get it in kilograms(kg).</p>
<details>
<summary>Display solution...</summary>

```html
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Pokeballs Are Magic</title>
    </head>

    <body onload="printTotalWeight()">
        <script>
            async function printTotalWeight() {
                const responses = await Promise.all([
                    getPokemon("pikachu"),
                    getPokemon("bulbasaur"),
                    getPokemon("charmander"),
                    getPokemon("squirtle"),
                    getPokemon("butterfree"),
                    getPokemon("pidgeotto"),
                ])
                const promises = responses.map(response => response.json())
                const pokemonList = await Promise.all(promises)
                const totalWeight = pokemonList.reduce((weightSum, { weight }) => weightSum + weight, 0) / 10
                console.log(totalWeight) // → 92.4
            }

            function getPokemon(name) {
                return fetch("https://pokeapi.co/api/v2/pokemon/" + name)
            }
        </script>
    </body>
</html>
```

</details>
</details>
</blockquote>

## 6. Experimenting With The Runtime Model

Go to [http://latentflip.com/loupe](http://latentflip.com/loupe) and run the experiment. Try writing some code of your own and see the results.

In particular, try this:

1. A chain of events where each event start the next event

2. A “tight” chain where the next event starts immediately after the previous (note: in the tool, time is slowed down considerably). Add a button and see that it is still “live”.

3. Two competing chains of events with different speeds. Note that the events need to be very spread out for the tool to have a chance of noticing

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Give all functions names - even the callbacks that you would normally create as arrow functions. This will make it easier to follow them around.</p>
<details>
<summary>Display solution...</summary>

```js
// Example for experiment 1
function foo() {
    setTimeout(function fooTimer() {
        bar()
    }, 1000)
}

function bar() {
    setTimeout(function barTimer() {
        baz()
    }, 1000)
}

function baz() {
    setTimeout(function bazTimer() {
        console.log("THE END!")
    }, 1000)
}

foo()

// Example for experiment 2
function tightChain() {
    setTimeout(function timer() {
        tightChain()
    }, 0)
}

tightChain()

$.on("button", "click", function onClick() {
    console.log("You clicked the button!")
})

// Example for experiment 3
function chain() {
    setTimeout(function timer() {
        chain()
    }, 6000)
}

function chain2() {
    setTimeout(function timer2() {
        chain2()
    }, 1000)
}

chain()
chain2()
```

</details>
</details>
</blockquote>

## 7. Building Promise.all

Given an array of promises, `Promise.all` returns a promise that waits for all of the promises in the array to finish. It then succeeds, yielding an array of result values. If a promise in the array fails, the promise returned by `all` fails too, with the failure reason from the failing promise.

Implement something like this yourself as a regular function called `Promise_all`.

Remember that after a promise has succeeded or failed, it can’t succeed or fail again, and further calls to the functions that resolve it are ignored. This can simplify the way you handle failure of your promise.

```js
function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        // Your code here.
    })
}

// Test code.
Promise_all([]).then(array => {
    console.log("This should be []:", array)
})
function soon(val) {
    return new Promise(resolve => {
        setTimeout(() => resolve(val), Math.random() * 500)
    })
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
    console.log("This should be [1, 2, 3]:", array)
})
Promise_all([soon(1), Promise.reject("X"), soon(3)])
    .then(array => {
        console.log("We should not get here")
    })
    .catch(error => {
        if (error != "X") {
            console.log("Unexpected failure:", error)
        }
    })
```

<blockquote>
<details>
<summary>Display hints...</summary>
<p>The function passed to the <code>Promise</code> constructor will have to call <code>then</code> on each of the promises in the given array. When one of them succeeds, two things need to happen. The resulting value needs to be stored in the correct position of a result array, and we must check whether this was the last pending promise and finish our own promise if it was.</p>
<p>The latter can be done with a counter that is initialized to the length of the input array and from which we subtract 1 every time a promise succeeds. When it reaches 0, we are done. Make sure you take into account the situation where the input array is empty (and thus no promise will ever resolve).</p>
<p>Handling failure requires some thought but turns out to be extremely simple. Just pass the <code>reject</code> function of the wrapping promise to each of the promises in the array as a <code>catch</code> handler or as a second argument to <code>then</code> so that a failure in one of them triggers the rejection of the whole wrapper promise.</p>
<details>
<summary>Display solution...</summary>

```js
function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        let results = []
        let pending = promises.length
        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then(result => {
                    results[i] = result
                    pending--
                    if (pending == 0) resolve(results)
                })
                .catch(reject)
        }
        if (promises.length == 0) resolve(results)
    })
}

// Test code.
Promise_all([]).then(array => {
    console.log("This should be []:", array)
})
function soon(val) {
    return new Promise(resolve => {
        setTimeout(() => resolve(val), Math.random() * 500)
    })
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
    console.log("This should be [1, 2, 3]:", array)
})
Promise_all([soon(1), Promise.reject("X"), soon(3)])
    .then(array => {
        console.log("We should not get here")
    })
    .catch(error => {
        if (error != "X") {
            console.log("Unexpected failure:", error)
        }
    })
```

</details>
</details>
</blockquote>

<sub><sup><em>Exercise 7 is created by Marijn Haverbeke, [Eloquent JavaScript](https://eloquentjavascript.net/). Licensed under [CC BY-NC 3.0](https://creativecommons.org/licenses/by-nc/3.0/)</em><sup><sub>
