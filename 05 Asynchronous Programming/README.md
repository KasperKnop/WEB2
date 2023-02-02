# :construction: Under Construction :construction:

# 05 Exercises: Asynchronous Programming

## 1. A Callback To Childhood

[PokéAPI](https://pokeapi.co/) is a free RESTful Pokémon API, that serves data from the pokémon video game series.

Using `XMLHttpRequest`, write a function that retrieves a pokémon and prints its name to the console. You have to make an HTML page to test the function in the browser, since `XmlHttpRequest` does not exist natively in Node.js.

Extend the page to allow the user to search for a pokémon by id or name through an input field and a search button. The page should display the name, id, type(s) and an image (sprite) of the searched pokémon, as well as the status of the request.

Make sure the page fails gracefully if there are any issues with the asynchronous calls.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Take some time to familiarize yourself with the API. The endpoint for a specific pokémon is:</p>
<p><code>https://pokeapi.co/api/v2/pokemon/{pokemon-name-or-id}</code></p>
<p>The implementation will take advantage of callbacks from the XMLHttpRequest object. The <load>load</code> event is fired when an XMLHttpRequest transaction completes successfully.</p>
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
                        document.querySelector("#message").innerText = message
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

## 4. Your Own Promise

Write your own `Promise` returning function using `XMLHttpRequest`, that can be used instead of `fetch` in the two previous exercises.

<blockquote>
<details>
<summary>Display hints...</summary>
<p></p>
<details>
<summary>Display solution...</summary>

```html

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
<p>The API does not accept a pokémon name starting with a capital letter!</p>
<p>You can use <code>map</code> and <code>json</code> to convert the response into JavaScript objects, but since <code>json</code> returns a <code>Promise</code>, you will have to use <code>Promise.all</code> twice - once to retrieve the responses and again to retrieve the list of pokémon from the responses</p>
<p>You can use <code>reduce</code> to reduce the list of pokémon into their total weight. To avoid using floating point numbers, the API returns the weight of a pokémon in hectogram(hg), which means you have to devide the result with 10 to get it in kilograms(kg) </p>
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
                const totalWeight = pokemonList.reduce((weightSum, pokemon) => weightSum + pokemon.weight, 0) / 10
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
<p></p>
<details>
<summary>Display solution...</summary>

```html

```

</details>
</details>
</blockquote>

## 7.

Write your own `Promise` returning function using `XMLHttpRequest`, that can be used instead of `fetch` in the two previous exercises.

<blockquote>
<details>
<summary>Display hints...</summary>
<p></p>
<details>
<summary>Display solution...</summary>

```html

```

</details>
</details>
</blockquote>
