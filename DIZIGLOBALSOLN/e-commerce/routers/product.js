const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

// Create
router.post("/", productController.createProduct);

// Read
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// Update
router.put("/:id", productController.updateProduct);

// Delete
router.delete("/:id", productController.deleteProduct);

module.exports = router;
