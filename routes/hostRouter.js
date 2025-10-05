// External Module
const express = require("express");

// Local Module
const hostController = require("../controllers/hostController");

const hostRouter = express.Router();

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);
hostRouter.get("/admin-home-list", hostController.getAdminHomeList);
hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.post("/update-home", hostController.postUpdateHome);
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

exports.hostRouter = hostRouter;
