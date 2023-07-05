const express = require("express");
const { setUserPassword, userLogin } = require("../controllers/authController");

const router = express.Router();

router.post("/set-password", setUserPassword);
router.post("/login-user", userLogin);

module.exports = router;
