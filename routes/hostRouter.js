const express = require("express");
const path = require("path");
const rootDir = require("../utils/rootDir");

const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home" });
});
const registeredHome = [];
hostRouter.post("/add-home", (req, res, next) => {
  registeredHome.push({ homeName: req.body.homeName });
  res.render("homeAdded", { pageTitle: "Home Registered" });
});

exports.hostRouter = hostRouter;
exports.registeredHome = registeredHome;
