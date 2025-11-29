const mongoose = require("mongoose");
const express = require("express");
const controllers = require("../controllers/packages");
const authentication = require("../middleware/authentication")
const packagesRouter = express.Router();

packagesRouter.post("/addpackage", controllers.createNewPackage);
packagesRouter.get("/",authentication,controllers.getAllPackages)


module.exports = packagesRouter;
