const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { getUser } = require("../service/auth");

const API_url = process.env.API_URL;

router.get(API_url + "/addProduct", (req, res) => {
  res.render("addProduct");
});
router.get("/", async (req, res) => {
  const products = await Product.find();
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  res.render("Products", { allProduct: products, user: user });
});
router.get("/about", async (req, res) => {
  res.render("aboutUs");
});
router.get("/contact", async (req, res) => {
  res.render("contactUs");
});
router.get("/login", async (req, res) => {
  res.render("login");
});
router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;
