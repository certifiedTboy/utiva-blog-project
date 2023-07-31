const express = require("express");

const {
  setUserPassword,
  userLogin,
  userLogout,
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
router.post("/login", checkEmailValidity, userLogin);
router.get("/logout", userLogout);

router.post(
  "/request-password-reset",
  checkEmailValidity,
  passwordResetRequest
);

router.post("/verify-password-reset-token", verifyPasswordResetData);

module.exports = router;
