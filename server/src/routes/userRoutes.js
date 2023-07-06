const express = require("express");
const {
  createUser,
  verifyUser,
  uploadUserProfile,
  updateUserName,
} = require("../controllers/userController");
const {
  checkEmailValidity,
  checkNameDataLength,
  checkUserDataInputIsEmpty,
} = require("../middlewares/validators/authDataValidator");
const {
  checkUserAccountOwnership,
} = require("../middlewares/authorization/userAuthorization");
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
  checkUserAccountOwnership,
  upload.single("image"),
  uploadUserProfile
);

router.put(
  "/change-user-name",
  Authenticate,
  checkUserAccountOwnership,
  checkUserDataInputIsEmpty,
  checkNameDataLength,
  updateUserName
);
module.exports = router;
