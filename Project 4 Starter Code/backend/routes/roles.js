const mongoose = require("mongoose")
const express = require("express")
const controllers = require("../controllers/roles")
const rolesRouter = express.Router()

rolesRouter.post("/roles", controllers.createNewRole)

module.exports = rolesRouter