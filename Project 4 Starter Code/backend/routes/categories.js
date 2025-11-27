const controllers = require("../controllers/categories");
const mongoose = require("mongoose");
const express = require("express");
const categoriesRouter = express.Router()

categoriesRouter.post("/addCategory", controllers.makeNewCategory)

module.exports = categoriesRouter