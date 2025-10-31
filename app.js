const express = require("express");
const path = require("path");

const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/rootDir");
const errorController = require("./controllers/error");
const { mongoose } = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.set("views", "view");

app.use(express.urlencoded());

app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  (req.isLoggedIn = req.get("Cookie")
    ? req.get("Cookie").split("=")[1]
    : false),
    next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(errorController.getError);

const PORT = 3000;
const DB_PATH = "mongodb+srv://Manish:Manish@airbnb.bxpahzc.mongodb.net/airbnb";
mongoose
  .connect(DB_PATH)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`your server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to mongo :", err);
  });
