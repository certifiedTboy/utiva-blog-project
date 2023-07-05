const express = require("express");
const { createUser, verifyUser } = require("../controllers/userController");
const {
  checkEmailValidity,
  checkNameDataLength,
} = require("../middlewares/validators/authDataValidator");

const router = express.Router();

router.post(
  "/create-user",
  checkEmailValidity,
  checkNameDataLength,
  createUser
);
router.post("/verify-user", verifyUser);
module.exports = router;
