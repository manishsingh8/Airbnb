// External Module
const express = require("express");

// Local Module
const homesController = require("../controllers/homes");

const hostRouter = express.Router();

hostRouter.get("/add-home", homesController.getAddHome);
hostRouter.get("/home-list", homesController.getHomeList);
hostRouter.get("/admin-home-list", homesController.getAdminHomeList);
hostRouter.post("/add-home", homesController.postAddHome);
hostRouter.get("/homes/:homeId", homesController.getHomeDetails);
hostRouter.get("/bookings", homesController.getHomeBookings);
hostRouter.get("/reserved-homes", homesController.getReservedHome);
hostRouter.get("/favourite-list", homesController.getFavouriteList);


exports.hostRouter = hostRouter;
