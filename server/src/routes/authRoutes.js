const express = require("express");
const { setUserPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/set-password", setUserPassword);

module.exports = router;
