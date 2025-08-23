const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");

router.route(`/`).get(async (req, res) => {
  const orderList = await Orders.find();
  if (!orderList) return res.status(500).json({ success: false });
  res.send(orderList);
});

module.exports = router;
