# 10 Exercises: Canvas

## 1. A Basic Web Server

Create an _Express_ web server that can handle a HTTP GET request and respond with a simple `"Hello, World!"` message.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>You can install <em>Express</em> using <code>npm i express</code></p>
<p>Remember to set <code>"type":"module"</code> in your <code>package.json</code> if you are using ES6 Modules.</p>
<p><a href="https://nodemon.io/">Nodemon</a> might also come in handy for automatically restarting your server on source code changes.</p>
<p>You can send the GET request directly from your browser, but later you might need an HTTP client like <a href="https://www.postman.com/">Postman</a> or <a href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client">REST Client</a> that allows you to test more complicated HTTP requests.</p>
<details>
<summary>Display solution...</summary>

```js
import express from "express"

const app = express()

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

app.listen(3000)
```

</details>
</details>
</blockquote>

## 2. Your Own PokeAPI

Create your own Pokemon API where the user can retrieve a pokemon by id. You can use [this file]([https://](https://github.com/KasperKnop/WEB2/blob/main/10%20Express/Pokemon.js)) containing data for the first 151 pokemon.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>You can parameterize URL segments using semicolons, e.g.: <code>/:id</code>. The captured parameters are populated in the <code>req.params</code> object.</p>
<p>Remember to specify appropriate HTTP status codes for when a pokemon with a given id is not found.</p>
<details>
<summary>Display solution...</summary>

```js
import express from "express"
import { POKEMON } from "./Pokemon.js"

const app = express()

app.get("/:id", (req, res) => {
  const reqId = parseInt(req.params.id)
  const pokemon = POKEMON.find((p) => p.id === reqId)
  if (pokemon) res.send(pokemon)
  else res.status(404).send({ msg: "No pokemon with the id of " + reqId })
})

app.listen(3000)
```

</details>
</details>
</blockquote>

## 3. Logging Middleware

Introduce a logging middleware in your PokeAPI. It should log the time that a specific endpoint was hit.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>Remember that middleware has to use the <code>next</code> function to continue the request.</p>
<p>To log the endpoint <code>protocol</code>, <code>get("host")</code> and <code>originalUrl</code> on the request object might be useful.</p>
<p>The current time can be retrieved using <code>new Date().toLocaleTimeString()</code></p>
<details>
<summary>Display solution...</summary>

```js
function logger(req, res, next) {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${new Date().toLocaleTimeString()}`
  )
  next()
}

app.use(logger)
```

</details>
</details>
</blockquote>

## 4. Account Creation

Create a new web server with an endpoint for signing up with email and password.
You do not have to persist the account details - keeping them in memory while the server is running is fine for now.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>You should use a POST request when you are sending data in the body.</p>
<p>Make sure that you have set up a middleware that parses the request body. You can do this using <code>app.use(express.json())</code>.</p>
<p>Never store a cleartext password. Make sure that you hash and salt it first. This can be done with <a href=”https://www.npmjs.com/package/bcrypt”>bcrypt</a>.</p>
<details>
<summary>Display solution...</summary>

```js
import express from "express"
import bcrypt from "bcrypt"

const app = express()
app.use(express.json())

const users = []

app.post("/signup", async (req, res) => {
  const { username, password } = req.body
  try {
    await createUser(username, password)
    res.send({ message: "User created!" })
  } catch (err) {
    res.status(500).send({ error: "Error signing up" })
  }
})

async function createUser(username, password) {
  const existingUser = users.find((user) => user.username === username)
  if (existingUser) throw new Error("Name taken!")

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { username, password: hashedPassword }
  users.push(newUser)
  return newUser
}

app.listen(3000)
```

</details>
</details>
</blockquote>

## 5. Login Functionality

Create an endpoint to login in with your newly created account. The endpoint should return a JSON Web Token for further authentication.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>You can generate a signed JWT using the <a href=”https://www.npmjs.com/package/jsonwebtoken”>jsonwebtoken</a> npm package.</p>
<p>The secret used for signing should be stored as an environmental variable for added security. The <a href=”https://www.npmjs.com/package/dotenv”>dotenv</a> package can help with that.</p>
<p>It is good practice to store the token in the authorization header:

```js
res.set("Authorization", `Bearer ${token}`).sendStatus(200)
```

</p>
<p>Use <em>bcrypt</em> to compare the password from the request with the stored password.</p>
<details>
<summary>Display solution...</summary>

```js
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv/config"

const app = express()
app.use(express.json())

const users = []

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await authenticateUser(username, password)
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.set("Authorization", `Bearer ${token}`).sendStatus(200)
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" })
  }
})

async function authenticateUser(username, password) {
  const user = users.find((user) => user.username === username)
  if (!user) throw new Error("Invalid credentials")

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) throw new Error("Invalid credentials")

  return { username: user.username }
}

app.post("/signup", async (req, res) => {
  const { username, password } = req.body
  try {
    await createUser(username, password)
    res.send({ message: "User created!" })
  } catch (err) {
    res.status(500).send({ error: "Error signing up" })
  }
})

async function createUser(username, password) {
  const existingUser = users.find((user) => user.username === username)
  if (existingUser) throw new Error("Name taken!")

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { username, password: hashedPassword }
  users.push(newUser)
  return newUser
}

app.listen(3000)

//.env
JWT_SECRET="p2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B"
```

</details>
</details>
</blockquote>

## 6. Protecting Endpoints

Create an endpoint that is protected by JWT authentication middleware.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>You can introduce middleware for specific endpoints:

```js
app.get("/protected", requireAuth, (req, res) => {
  //Your protected route
})
```

</p>
<p>You should send the token using the authorization header. It should be in the format “Bearer token”, which allows you to extract it by converting the string to an array:

```js
const token = req.headers.authorization.split(" ")[1]
```

</p>
<p>You should check if the token exists and use the <code>verify</code> method on the JWT object to check if the token is valid. </p>
<p>Remember to send <code>401 Unauthorized</code> error messages when appropriate.</p>
<details>
<summary>Display solution...</summary>

```js
app.get("/protected", requireAuth, (req, res) => {
  res.send({ message: `Hello ${req.user.username}! This route is protected.` })
})

function requireAuth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]
  if (!token) return res.status(401).send({ error: "Unauthorized" })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Unauthorized" })
    req.user = decoded
    next()
  })
}
```

</details>
</details>
</blockquote>

## 7. Consuming the API from a Frontend

Create a small single page application that can be used to login and access the protected data on your web server.

<blockquote>
<details>
<summary>Display hints...</summary>
<p>When retrieving the token from the login, you can store the token in localstorage:</p>

```js
const authString = await response.headers.get("Authorization")
const token = authString.split(" ")[1]
localStorage.setItem("jwt", token)
```

<p>To send the token with a fetch request, you can do the following:

```js
fetch("protected-endpoint", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
})

```

</p>
<p>To allow CORS, you can use the <a href="https://www.npmjs.com/package/cors">cors</a> npm package with the following setup on your server:

```js
import cors from "cors"
const app = express()
app.use(cors({ exposedHeaders: "Authorization" }))
```

In a production environment you should choose who CORS is enabled for instead of enabeling it for everyone.</p>
<p>If you are sending form data, you will also have to create middleware that parses it:

```js
app.use(express.urlencoded({ extended: false }))
```

</p>

<details>
<summary>Display solution...</summary>

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Authentication Example</title>
</head>

<body>
    <h2>Login</h2>
    <input type="text" id="username" />
    <input type="password" id="password" />
    <button onclick="login()">Login</button>
    <hr />
    <button onclick="getData()">Get Protected Data</button>
    <script>
        async function login() {
            const username = document.querySelector("#username").value
            const password = document.querySelector("#password").value
            const response = await fetch("http://localhost:3000/login", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ username, password }),
            })
            if (response.ok) {
                const authString = await response.headers.get("Authorization")
                const token = authString.split(" ")[1]
                localStorage.setItem("jwt", token)
                alert("Login successful!")
            } else {
                alert("Login failed!")
            }
        }

        async function getData() {
            const token = localStorage.getItem("jwt")
            const response = await fetch("http://localhost:3000/protected", {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
            })
            if (response.ok) {
                const data = await response.json()
                alert(JSON.stringify(data))
            } else {
                alert("Error retrieving data!")
            }
        }
    </script>
</body>

</html>
```

```js
//Add to your express server:
import cors from "cors"
const app = express()
app.use(cors({ exposedHeaders: "Authorization" }))
```

</details>
</details>
</blockquote>
