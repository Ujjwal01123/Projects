const User = require("../models/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

async function HandleGetUserList(req, res) {
  const userList = await User.find().select("-passwordHash");
  if (!userList) return res.status(500).json({ success: false });
  res.send(userList);
}

async function HandleRegisterNewUser(req, res) {
  try {
    let user = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      color: req.body.color,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      appartment: req.body.appartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    };

    // check if email exists
    const existingEmail = await User.findOne({ email: req.body.email });
    // check if phone exists
    const existingPhone = await User.findOne({ phone: req.body.phone });

    if (existingEmail && existingPhone) {
      return res.status(400).json({
        message: "Both email and phone already exist, Please login....",
      });
    } else if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email already exists, Please login...." });
    } else if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Phone number already exists, Please login...." });
    }

    // create user
    const createdUser = await User.create(user);

    if (!createdUser) {
      return res.status(500).json({ message: "The user cannot be created!" });
    }

    res
      .status(201)
      .send({ user: createdUser, msg: "User created successfully..." });
  } catch (error) {
    if (error.name === "ValidationError") {
      // collect validation messages from schema
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        error_messages: messages,
      });
    }

    // other errors
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function HandleGetUserWithId(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) return res.status(404).send("the user with this id is not found!");
  res.status(201).send({ user, msg: "user found..." });
}

async function HandleGetUserCount(req, res) {
  const userCount = await User.countDocuments();

  if (!userCount) {
    return res.status(500).json({ success: false });
  }
  res.send({
    userCount: userCount,
  });
}

async function HandleDeleteUserWithId(req, res) {
  await User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "the user is deleted...." });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
}

async function HandleUserLogin(req, res) {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.SECRET_KEY;

  if (!user) {
    return res.status(400).send("The user not found...");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
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
}

module.exports = {
  HandleGetUserList,
  HandleRegisterNewUser,
  HandleGetUserWithId,
  HandleGetUserCount,
  HandleDeleteUserWithId,
  HandleUserLogin,
};
