const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a product description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide a product image URL"],
  },
  category: {
    type: String,
    required: [true, "Please provide a product category"],
  },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
