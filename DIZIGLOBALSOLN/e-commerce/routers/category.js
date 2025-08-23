const express = require("express");
const {
  HandleGetAllCategories,
  HandleAddNewCategory,
  HandleGetCategoryById,
  HandleUpdateCategoryById,
  HandleDeleteCategoryById,
} = require("../controllers/category");
const router = express.Router();

router.route(`/`).get(HandleGetAllCategories).post(HandleAddNewCategory);

router
  .route("/:categoryId")
  .get(HandleGetCategoryById)
  .put(HandleUpdateCategoryById)
  .delete(HandleDeleteCategoryById);

module.exports = router;
