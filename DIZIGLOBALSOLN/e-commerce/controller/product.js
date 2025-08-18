const Product = require("../models/product");

async function handleGetAllProductsJson(req, res) {
  const products = await Product.find();
  res.status(200).send(products);
}

async function handleGetProductById(req, res) {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) return res.send({ msg: "This product is not available..." });
  res.status(200).send(product);
}

async function handleUpdateProductById(req, res) {
  const id = req.params.id;
  const productCheck = await Product.findById(id);
  if (!productCheck)
    return res.status(404).send({ msg: "This product is not available..." });
  await Product.findByIdAndUpdate(id, {
    category: req.body.category,
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    rating: req.body.rating,
    reviewNo: req.body.reviewNo,
    composition: req.body.composition,
    MRP: req.body.MRP,
    price: req.body.price,
    countInStock: req.body.countInStock,
  });
  res.send({ msg: `product with ${id} upadated successfully...` });
}

async function handleDeleteProductById(req, res) {
  const id = req.params.id;
  const productCheck = await Product.findById(id);
  if (!productCheck)
    return res.status(404).send({ msg: "This product is not available..." });
  await Product.findByIdAndDelete(id);
  res.send({ msg: "product deleted successfully....." });
}

async function handleAddNewProduct(req, res) {
  await Product.create({
    category: req.body.category,
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    rating: req.body.rating,
    reviewNo: req.body.reviewNo,
    composition: req.body.composition,
    MRP: req.body.MRP,
    price: req.body.price,
    countInStock: req.body.countInStock,
  });

  res.status(201).redirect("/");
}

module.exports = {
  handleGetAllProductsJson,
  handleGetProductById,
  handleUpdateProductById,
  handleDeleteProductById,
  handleAddNewProduct,
};
