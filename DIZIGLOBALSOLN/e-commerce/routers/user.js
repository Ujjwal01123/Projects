const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

router
  .route(`/`)
  .get(async (req, res) => {
    const userList = await User.find().select("-passwordHash");
    if (!userList) return res.status(500).json({ success: false });
    res.send(userList);
  })
  .post(async (req, res) => {
    let user = {
      name: req.body.name,
      email: req.body.email,
      color: req.body.color,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      appartment: req.body.appartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    };
    await User.create(user);
    if (!user) return res.status(404).send("the user cannot be created!");
    res.status(201).send({ user, msg: "user created successfully..." });
  });

router.route("/:id").get(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) return res.status(404).send("the user with this id is not found!");
  res.status(201).send({ user, msg: "user found..." });
});

router.route("/login").post(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.SECRET_KEY;

  if (!user) {
    return res.status(400).send("The user not found...");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("Incorrect password...");
  }
});

module.exports = router;
