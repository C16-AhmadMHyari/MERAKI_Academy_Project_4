const controllers = require("../controllers/categories");
const mongoose = require("mongoose");
const express = require("express");
const categoriesRouter = express.Router()
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

categoriesRouter.post("/addCategory",authentication,authorization("CREATE"), controllers.makeNewCategory)
categoriesRouter.get("/", controllers.getAllCategories)
categoriesRouter.get("/:id",authentication, controllers.findCategory)
categoriesRouter.put("/:id/update",authentication,authorization("UPDATE", controllers.updateCategory))

module.exports = categoriesRouter