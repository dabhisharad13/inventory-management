//imports
//jslint-ignore-line
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Product = require("./models/productModel");

const app = express();

//setting middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.post("/insert-product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ message: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//fetch all products
app.get("/all-products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json({ message: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//fetch product by id
app.get("/product/:id", async (req, res) => {
  try {
    //deconstruct id from req using params
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ message: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update a product in db
app.put("/product/:id", async (req, res) => {
  try {
    //deconstruct id from req using params
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    //if product not found
    if (!product) {
      res.status(404).json({ message: `Cannot find product with id : ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json({ message: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete a product in db
app.delete("/product/:id", async (req, res) => {
  try {
    //deconstruct id from req using params
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    //if product not found
    if (!product) {
      res.status(404).json({ message: `Cannot find product with id : ${id}` });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
