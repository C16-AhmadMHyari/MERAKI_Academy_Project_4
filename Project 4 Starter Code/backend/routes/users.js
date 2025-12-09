const mongoose = require("mongoose")
const express = require("express")
const controllers= require("../controllers/users" )
const {addDonation} = require("../controllers/donations")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const { getAllDonations } = require("../controllers/donations")
const usersRouter = express.Router()

usersRouter.post("/register", controllers.register)
usersRouter.post("/login", controllers.login)
usersRouter.post("/user/:id",authentication,authorization("CREATE"),controllers.getUser)
usersRouter.post("/donate",authentication,authorization("DONATE"),addDonation)
usersRouter.get("/alldonations",authentication,authorization("CREATE"),getAllDonations)
usersRouter.get("/allusers",authentication,authorization("CREATE"), controllers.getAllUsers)

module.exports = usersRouter