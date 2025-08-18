const express = require("express");
const router = express.Router();

const { handleSignupUser, handleLoginUser } = require("../controller/user");

router.post("/", handleSignupUser);
router.post("/login", handleLoginUser);

module.exports = router;
