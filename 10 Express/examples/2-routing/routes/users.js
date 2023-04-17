import express from "express"
import users from "../Users.js"

const router = express.Router()

router.get("/", (req, res) => res.send(users))

router.get("/:id", (req, res) => {
  const reqId = parseInt(req.params.id)
  const user = users.find((user) => user.id === reqId)
  if (user) res.send(user)
  else res.status(404).send({ msg: "No member with the id of " + reqId })
})

export { router as default }
