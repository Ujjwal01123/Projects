const Orders = require("../models/orders");
const { OrderItem } = require("../models/order-item");

async function HandleGetAllOrders(req, res) {
  const orderList = await Orders.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });
  if (!orderList) return res.status(500).json({ success: false });
  res.send(orderList);
}

async function HandleAddNewOrders(req, res) {
  try {
    const orderItemsIds = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = await OrderItem.create({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        return newOrderItem._id; // return the MongoDB ObjectId
      })
    );

    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;

        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = {
      orderItems: orderItemsIdsResolved,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
    };

    const createdOrder = await Orders.create(order);

    if (!createdOrder) {
      return res.status(400).send("The order cannot be created");
    }

    res.status(201).send(createdOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
}

async function HandleGetOrdersById(req, res) {
  const order = await Orders.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "categoryId" },
    });
  if (!order) return res.status(500).json({ success: false });
  res.send(order);
}

async function HandleUpdateOrdersById(req, res) {
  const order = await Orders.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!order) {
    return res.status(500).send({ msg: "the order cannot be updated..." });
  }

  res.send(order);
}

async function HandleDeleteOrdersById(req, res) {
  Orders.findByIdAndDelete(req.params.id)
    .then(async (order) => {
      if (order) {
        await Promise.all(
          order.orderItems.map(async (orderItem) => {
            await OrderItem.findByIdAndDelete(orderItem);
          })
        );
        return res
          .status(200)
          .json({ success: true, message: "the order is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "order not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
}

async function HandleOrderTotalSales(req, res) {
  const totalSales = await Orders.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);

  if (!totalSales) {
    return res.status(400).send("The order sales cannot be generated");
  }

  res.send({ totalSales: totalSales.pop().totalsales });
}

async function HandleOrderCount(req, res) {
  const orderCount = await Orders.countDocuments();

  if (!orderCount) {
    res.status(500).json({ success: false });
  }
  res.send({ orderCount: orderCount });
}

async function HandleGetUserOrders(req, res) {
  const userOrderList = await Orders.find({ user: req.params.userId })
    .populate("user", "name")
    .sort({ dateOrdered: -1 });
  if (!userOrderList) return res.status(500).json({ success: false });
  res.send(userOrderList);
}

module.exports = {
  HandleGetAllOrders,
  HandleAddNewOrders,
  HandleGetOrdersById,
  HandleUpdateOrdersById,
  HandleDeleteOrdersById,
  HandleOrderTotalSales,
  HandleOrderCount,
  HandleGetUserOrders,
};
