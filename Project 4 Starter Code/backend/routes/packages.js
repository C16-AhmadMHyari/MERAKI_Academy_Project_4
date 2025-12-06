const mongoose = require("mongoose");
const express = require("express");
const controllers = require("../controllers/packages");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const packagesRouter = express.Router();

packagesRouter.post("/addpackage",authentication,authorization("CREATE"), controllers.createNewPackage);
packagesRouter.get("/",controllers.getAllPackages)
packagesRouter.delete("/delete",authentication, authorization("DELETE"), controllers.deletePackage)
packagesRouter.put("/changeActivity/:id", authentication, authorization("UPDATE"), controllers.changeActivity)
packagesRouter.get("/:id", controllers.findPackage)

module.exports = packagesRouter;
