/* Simple authentication example. Rudimentary error handling without middleware, no input sanitization or validation, no persistence, no ids for users, etc...*/

import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import users from "./Users.js"
import dotenv from "dotenv/config"
import cors from "cors"

const app = express()
app.use(cors({ exposedHeaders: "Authorization" }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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
    const user = users.find(user => user.username === username)
    if (!user) throw new Error("Invalid credentials")

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error("Invalid credentials")

    return { username: user.username }
}

app.post("/signup", async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await createUser(username, password)
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.set("Authorization", `Bearer ${token}`).sendStatus(200)
    } catch (err) {
        res.status(500).send({ error: "Error signing up" })
    }
})

async function createUser(username, password) {
    const existingUser = users.find(user => user.username === username)
    if (existingUser) throw new Error("Name taken!")

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = { username, password: hashedPassword }
    users.push(newUser)
    return newUser
}

app.listen(3000, () => console.log("Server running on port 3000"))
