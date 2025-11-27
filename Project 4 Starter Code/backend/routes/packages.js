const mongoose = require("mongoose");
const express = require("express");
const controllers = require("../controllers/packages");
const packagesRouter = express.Router();

packagesRouter.post("/addpackage", controllers.createNewPackage);

module.exports = packagesRouter;
