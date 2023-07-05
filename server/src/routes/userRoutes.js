const express = require("express");
const { createUser, verifyUser } = require("../controllers/userController");
const {
  checkEmailValidity,
  checkNameDataLength,
  checkUserDataInputIsEmpty,
} = require("../middlewares/validators/authDataValidator");

const router = express.Router();

router.post(
  "/create-user",
  checkUserDataInputIsEmpty,
  checkEmailValidity,
  checkNameDataLength,
  createUser
);
router.post("/verify-user", verifyUser);
module.exports = router;
