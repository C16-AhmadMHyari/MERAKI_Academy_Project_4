const mongoose = require("mongoose")
const express = require("express")
const controllers= require("../controllers/users")
const usersRouter = express.Router()

usersRouter.post("/register", controllers.register)

module.exports = usersRouter