const Product = require("../models/product");
const Category = require("../models/category");
const { mongoose } = require("mongoose");

async function HandleGetAllProducts(req, res) {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    const allProducts = await Product.find(filter).populate("categoryId");
    if (!allProducts) {
      res.status(500).json({ success: false });
    }
    res.send(allProducts);
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }
}

async function HandleCreateNewProduct(req, res) {
  try {
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send("Invalid category");
    const product = {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      categoryId: req.body.categoryId,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    };
    if (!product)
      return res.status(500).send("the product cannot be created...");
    await Product.create(product);
    res.status(201).send({ product, msg: "New Product Added successfully.." });
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }
}

async function HandleGetProductById(req, res) {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) return res.status(500).json({ success: false });
  res.send(product);
}

async function HandleUpdateProductById(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      categoryId: req.body.categoryId,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!product) return res.status(500).send("the product cannot be updated");

  res.send(product);
}

async function HandleDeleteProductById(req, res) {
  await Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is deleted...." });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
}

async function HandleGetProductCount(req, res) {
  const productCount = await Product.countDocuments();

  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({ productCount: productCount });
}

async function HandleGetFeaturedProducts(req, res) {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
}

module.exports = {
  HandleGetAllProducts,
  HandleCreateNewProduct,
  HandleGetProductById,
  HandleUpdateProductById,
  HandleDeleteProductById,
  HandleGetProductCount,
  HandleGetFeaturedProducts,
};
