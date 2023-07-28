const express = require("express");
const {
  createUser,
  verifyUser,
  uploadUserProfile,
  updateUserName,
  getCurrentUser,
  getUserByUsername,
  getUserById,
  followUser,
} = require("../controllers/userController");
const {
  checkEmailValidity,
  checkNameDataLength,
  checkUserDataInputIsEmpty,
  checkAcceptTerms,
  checkUserDataInputForUpdateIsEmpty,
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
  checkAcceptTerms,
  checkNameDataLength,
  createUser
);
router.post("/verify-user", verifyUser);
router.post("/follow-user", Authenticate, followUser);

router.put(
  "/upload-image",
  Authenticate,
  checkUserAccountOwnership,
  upload.single("image"),
  uploadUserProfile
);

router.put(
  "/change-username",
  Authenticate,
  checkUserAccountOwnership,
  checkUserDataInputForUpdateIsEmpty,
  checkNameDataLength,
  updateUserName
);

router.get("/me", Authenticate, getCurrentUser);
router.get("/:username", getUserByUsername);
router.get("/profile/:userId", getUserById);
module.exports = router;
