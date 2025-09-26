const express = require("express");
const path = require("path");

const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/rootDir");

const app = express();
app.set("view engine", "ejs");
app.set("views", "view");

app.use(express.urlencoded());

app.use(express.static(path.join(rootDir, "public")));

app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`your server is running at ${PORT}`);
});
