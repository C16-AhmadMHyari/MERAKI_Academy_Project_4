const mongoose = require("mongoose");
const express = require("express");
const controllers = require("../controllers/packages");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const packagesRouter = express.Router();

packagesRouter.post("/addpackage", controllers.createNewPackage);
packagesRouter.get("/",authentication,controllers.getAllPackages)
packagesRouter.delete("/delete",authentication, authorization("DELETE"), controllers.deletePackage)


module.exports = packagesRouter;
