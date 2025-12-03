const controllers = require("../controllers/categories");
const mongoose = require("mongoose");
const express = require("express");
const categoriesRouter = express.Router()
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

categoriesRouter.post("/addCategory",authentication,authorization("CREATE"), controllers.makeNewCategory)
categoriesRouter.get("/", controllers.getAllCategories)

module.exports = categoriesRouter