const mongoose = require("mongoose")
const express = require("express")
const controllers= require("../controllers/users" )
const {addDonation} = require("../controllers/donation")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const usersRouter = express.Router()

usersRouter.post("/register", controllers.register)
usersRouter.post("/login", controllers.login)
usersRouter.post("/donate",authentication,authorization("DONATE"),addDonation)

module.exports = usersRouter