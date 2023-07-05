const express = require("express");
const { setUserPassword, userLogin } = require("../controllers/authController");
const {
  checkPasswordValidity,
  checkPasswordMatch,
} = require("../middlewares/validators/authDataValidator");

const router = express.Router();

router.post(
  "/set-password",
  checkPasswordValidity,
  checkPasswordMatch,
  setUserPassword
);
router.post("/login-user", userLogin);

module.exports = router;
