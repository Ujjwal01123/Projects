const express = require("express");
const router = express.Router();

const {
  HandleGetAllOrders,
  HandleAddNewOrders,
  HandleGetOrdersById,
  HandleUpdateOrdersById,
  HandleDeleteOrdersById,
  HandleOrderTotalSales,
  HandleOrderCount,
  HandleGetUserOrders,
} = require("../controllers/order");

router.route(`/`).get(HandleGetAllOrders).post(HandleAddNewOrders);

router.route("/:id").get(HandleGetOrdersById);

router.route("/:id").put(HandleUpdateOrdersById).delete(HandleDeleteOrdersById);

router.route("/get/totalSales").get(HandleOrderTotalSales);

router.route("/get/count").get(HandleOrderCount);

router.route("/get/userorders/:userId").get(HandleGetUserOrders);

module.exports = router;
