// External Module
const express = require("express");

// Local Module
const homesController = require("../controllers/homes");

const hostRouter = express.Router();

hostRouter.get("/add-home", homesController.getAddHome);

hostRouter.post("/add-home", homesController.postAddHome);

exports.hostRouter = hostRouter;
