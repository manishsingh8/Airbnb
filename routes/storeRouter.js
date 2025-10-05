const express = require("express");

const storeController = require("../controllers/storeController");
const userRouter = express.Router();

userRouter.get("/", storeController.getHomes);
userRouter.post("/favorites", storeController.postFavorite);
userRouter.get("/home-list", storeController.getHomeList);
userRouter.get("/homes/:homeId", storeController.getHomeDetails);
userRouter.get("/bookings", storeController.getHomeBookings);
userRouter.get("/reserved-homes", storeController.getReservedHome);
userRouter.get("/favourite-list", storeController.getFavouriteList);
userRouter.post("/delete-favorite/:homeId", storeController.postRemoveFavorite);

module.exports = userRouter;
