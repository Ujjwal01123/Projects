const express = require("express");
const router = express.Router();

const {
  HandleGetAllProducts,
  HandleCreateNewProduct,
  HandleGetProductById,
  HandleUpdateProductById,
  HandleDeleteProductById,
  HandleGetProductCount,
  HandleGetFeaturedProducts,
} = require("../controllers/product");

router.route(`/`).get(HandleGetAllProducts).post(HandleCreateNewProduct);

router
  .route("/:id")
  .get(HandleGetProductById)
  .put(HandleUpdateProductById)
  .delete(HandleDeleteProductById);

router.route("/get/count").get(HandleGetProductCount);

router.route("/get/featured/:count").get(HandleGetFeaturedProducts);

module.exports = router;
