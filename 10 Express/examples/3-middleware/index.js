import express from "express"
import users from "./Users.js"
import logger from "./logger.js"

const app = express()
app.use(logger)

app.get("/", (req, res) => res.send(users))

app.listen(3000)
