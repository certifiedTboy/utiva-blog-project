const express = require("express");
const { createUser, verifyUser } = require("../controllers/userController");

const router = express.Router();

router.post("/create-user", createUser);
router.post("/verify-user", verifyUser);
module.exports = router;
