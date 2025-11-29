const controllers = require("../controllers/categories");
const mongoose = require("mongoose");
const express = require("express");
const categoriesRouter = express.Router()

categoriesRouter.post("/addCategory", controllers.makeNewCategory)
categoriesRouter.get("/", controllers.getAllCategories)

module.exports = categoriesRouter