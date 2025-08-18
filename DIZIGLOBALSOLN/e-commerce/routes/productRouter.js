const express = require("express");
const router = express.Router();

const {
  handleGetAllProductsJson,
  handleGetProductById,
  handleUpdateProductById,
  handleDeleteProductById,
  handleAddNewProduct,
} = require("../controller/product");

router.get("/", handleGetAllProductsJson);
router.get("/:id", handleGetProductById);
router.put("/:id", handleUpdateProductById);
router.delete("/:id", handleDeleteProductById);
router.post("/", handleAddNewProduct);

module.exports = router;
