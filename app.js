const express = require("express");
const path = require("path");

const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");

const app = express();
app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`your server is running at ${PORT}`);
});
