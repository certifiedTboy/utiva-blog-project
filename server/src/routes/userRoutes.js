const express = require("express");
const {
  createUser,
  verifyUser,
  uploadUserProfile,
} = require("../controllers/userController");
const {
  checkEmailValidity,
  checkNameDataLength,
  checkUserDataInputIsEmpty,
} = require("../middlewares/validators/authDataValidator");
const Authenticate = require("../middlewares/authorization/Authenticate");
const upload = require("../middlewares/profileUpload/multer");

const router = express.Router();

router.post(
  "/create-user",
  checkUserDataInputIsEmpty,
  checkEmailValidity,
  checkNameDataLength,
  createUser
);
router.post("/verify-user", verifyUser);

router.put(
  "/upload-image",
  Authenticate,
  upload.single("image"),
  uploadUserProfile
);
module.exports = router;
