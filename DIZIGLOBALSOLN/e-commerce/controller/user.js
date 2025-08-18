const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleSignupUser(req, res) {
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.render("login", {
    msg: "Your Profile is created successfully...",
  });
}

async function handleLoginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      status: "Incorrect Id or Password...",
    });
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = { handleSignupUser, handleLoginUser };
