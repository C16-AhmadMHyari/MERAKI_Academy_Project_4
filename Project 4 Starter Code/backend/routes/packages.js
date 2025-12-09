const mongoose = require("mongoose");
const express = require("express");
const controllers = require("../controllers/packages");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const packagesRouter = express.Router();

packagesRouter.post("/addpackage",authentication,authorization("CREATE"), controllers.createNewPackage);
packagesRouter.get("/",controllers.getAllPackages)
packagesRouter.get("/search", controllers.search)
packagesRouter.delete("/delete/:id",authentication, authorization("DELETE"), controllers.deletePackage)
packagesRouter.put("/update/:id", authentication, authorization("UPDATE"), controllers.update)
packagesRouter.get("/:id",authentication, controllers.findPackage)


module.exports = packagesRouter;
