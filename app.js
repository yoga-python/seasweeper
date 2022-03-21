const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

// utils
const config = require("./utils/config");
// routers
const highscoresRouter = require("./controllers/highscores");

const app = express(); // initialize express app

console.log("connecting to", config.MONGODB_URI); // log mongodb uri

// connect to mongodb
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connection to MongoDB:", error.message);
  });

// middleware
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

// routers
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use("/api/highscores", highscoresRouter);

module.exports = app;
