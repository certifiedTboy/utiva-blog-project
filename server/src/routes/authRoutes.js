const express = require("express");

const {
  setUserPassword,
  userLogin,
  passwordResetRequest,
  verifyPasswordResetData,
} = require("../controllers/authController");
const {
  checkPasswordValidity,
  checkPasswordMatch,
  checkEmailValidity,
} = require("../middlewares/validators/authDataValidator");

const router = express.Router();

router.post(
  "/set-password",
  checkPasswordValidity,
  checkPasswordMatch,
  setUserPassword
);
router.post("/login-user", checkEmailValidity, userLogin);

router.post(
  "/request-password-reset",
  checkEmailValidity,
  passwordResetRequest
);

router.post("/verify-password-reset-token", verifyPasswordResetData);

module.exports = router;
