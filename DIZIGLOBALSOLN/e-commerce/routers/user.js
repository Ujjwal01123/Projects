const express = require("express");
const router = express.Router();

const {
  HandleGetUserList,
  HandleRegisterNewUser,
  HandleGetUserWithId,
  HandleGetUserCount,
  HandleDeleteUserWithId,
  HandleUserLogin,
} = require("../controllers/user");

router.route(`/`).get(HandleGetUserList);

router.route("/register").post(HandleRegisterNewUser);

router.route("/:id").get(HandleGetUserWithId);

router.route("/get/count").get(HandleGetUserCount);

router.route("/:id").delete(HandleDeleteUserWithId);

router.route("/login").post(HandleUserLogin);

module.exports = router;
