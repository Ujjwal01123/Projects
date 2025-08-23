const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: Number,
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
