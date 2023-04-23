//imports
//jslint-ignore-line
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// importing the config file
dotenv.config({ path: "config.env" });
dotenv.config({ path: "db.env" });

//log request
app.use(morgan("tiny"));

//setting port
const PORT = process.env.PORT || 8080;
const DATABASE = process.env.DATABASE;

//database connection
mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//routes
app.get("/", (req, res) => {
  res.send("CRUD APP");
});

app.listen(PORT, () => {
  console.log("Server running");
});
