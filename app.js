const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");

const DB_PATH = "mongodb+srv://Manish:Manish@airbnb.bxpahzc.mongodb.net/airbnb";

const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/rootDir");
const errorController = require("./controllers/error");
const { mongoose } = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.set("views", "view");

app.use(express.static(path.join(rootDir, "public")));
app.use(express.urlencoded());

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.use(
  session({
    secret: "Secret Message",
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use((req, res, next) => {
  (req.isLoggedIn = req.session.isLoggedIn), next();
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
