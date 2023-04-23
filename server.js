//imports
//jslint-ignore-line
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Product = require("./models/productModel")

const app = express();

//setting middleware
app.use(express.json());

// importing the config file
dotenv.config({ path: "env/config.env" });
dotenv.config({ path: "env/db.env" });

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

//insert product in db
app.post('/insert-product', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({message: product})
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
})

//fetch all products
app.get('/all-products', async(req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json({message: product})
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
})

app.listen(3000, () => {
  console.log("Server running");
});
