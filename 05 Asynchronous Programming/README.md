# :construction: Under Construction :construction:

# 05 Exercises: Asynchronous Programming

## 1. A Callback To Childhood

[PokeAPI](https://pokeapi.co/) is a free RESTful Pokémon API, that serves data from the pokemon video game series.

Using `XMLHttpRequest`, write a function that retrieves a pokemon and prints its name to the console. You have to make an HTML page to test the function in the browser, since `XmlHttpRequest` does not exist natively in Node.js.

Extend the page to allow the user to search for a pokemon by id or name through an input field and a search button. The page should display the name, id, type(s) and an image (sprite) of the searched pokemon, as well as the status of the request.

Make sure the page fails gracefully if there are any issues with the asynchronous calls.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Take some time to familiarize yourself with the API. The endpoint for a specific pokemon is <code>“https://pokeapi.co/api/v2/pokemon/{pokemon-name-or-id}”</code></p>
<p>The implementation will take advantage of callbacks from the XMLHttpRequest ob</p>
<p>You can extract the response through the <code>responseText</code> property on the <code>XMLHttpRequest</code> object and you can deserialize any JSON with <code>JSON.parse</code>.</p>
<p>Error handling has its own callback, but this does not cover any HTTP error status. You can check the status code through the <code>status</code> property on the XMLHttpRequest object.</p>
<details>
<summary>Display solution...</summary>

```html
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Solution</title>
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
