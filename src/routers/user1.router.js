const user1Router = require("express").Router()
const userController = require("../controllers/user1.controller")

user1Router.get("/", userController.getAll)

module.exports = user1Router
