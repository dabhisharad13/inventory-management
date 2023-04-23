 //jslint-ignore-line
const { timeStamp } = require("console");
const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
  },
  { timeStamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.export = Product;
