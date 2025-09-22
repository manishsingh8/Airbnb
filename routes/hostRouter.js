const express = require("express");
const path = require("path");

const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "view", "addHome.html"));
});
hostRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "view", "homeAdded.html"));
});

module.exports = hostRouter;
