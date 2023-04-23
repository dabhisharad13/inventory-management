const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();

// importing the config  file
dotenv.config({ path: "config.env" });

//setting port
const PORT = process.env.PORT || 8080;

//log request
app.use(morgan("tiny"));

//routes
app.get("/", (req, res) => {
  res.send("CRUD APP");
});

app.listen(PORT, () => {
  console.log("Server running");
});
