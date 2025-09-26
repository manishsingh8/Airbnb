const express = require("express");
const { registeredHome } = require("./hostRouter");

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  res.render("home", { registeredHome, pageTitle: "airbnb" });
});

module.exports = userRouter;
