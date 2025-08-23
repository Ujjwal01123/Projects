const Category = require("../models/category");

async function HandleGetAllCategories(req, res) {
  const categoryList = await Category.find();
  if (!categoryList) return res.status(500).json({ success: false });
  res.send(categoryList);
}

async function HandleAddNewCategory(req, res) {
  let category = {
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  };
  await Category.create({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  if (!category) return res.status(404).send("the category cannot be created!");
  res.status(201).send({ msg: "category created successfully..." });
}

async function HandleGetCategoryById(req, res) {
  const id = req.params.categoryId;
  const category = await Category.findById(id);
  if (!category)
    return res.status(404).json({
      success: false,
      message: "there is no category with this given id",
    });
  res.status(200).send(category);
}

async function HandleUpdateCategoryById(req, res) {
  const category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) return res.status(400).send("the category cannot be created");

  res.send(category);
}

async function HandleDeleteCategoryById(req, res) {
  await Category.findByIdAndDelete(req.params.categoryId)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category is deleted...." });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
}

module.exports = {
  HandleGetAllCategories,
  HandleAddNewCategory,
  HandleGetCategoryById,
  HandleUpdateCategoryById,
  HandleDeleteCategoryById,
};
