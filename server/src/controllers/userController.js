const ResponseHandler = require("../lib/generalResponse/ResponseHandler");
const {
  newUser,
  updateUserProfileImage,
  userNameUpdate,
} = require("../services/userServices");
const { verifyUserToken } = require("../services/verificationServices");

const createUser = async (req, res, next) => {
  try {
    const { email, firstName, lastName } = req.body;
    const createdUser = await newUser(email, firstName, lastName);
    if (createdUser) {
      ResponseHandler.created(
        res,
        createdUser,
        `A mail has been sent to ${createdUser.email} to complete your registration process`
      );
    }
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { userId, verificationToken } = req.body;
    const userIsVerified = await verifyUserToken(userId, verificationToken);
    if (userIsVerified) {
      ResponseHandler.ok(
        res,
        userIsVerified,
        `verification for ${userIsVerified.email} is successful. Choose a valid password to complete registration`
      );
    }
  } catch (error) {
    next(error);
  }
};

const uploadUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const imagePath = "uploads/" + req.file.filename;

    const updatedUser = await updateUserProfileImage(userId, imagePath);

    if (updatedUser) {
      ResponseHandler.ok(res, updatedUser, "profile uploaded success");
    }
  } catch (error) {
    next(error);
  }
};

const updateUserName = async (req, res, next) => {
  try {
    const userId = req.user;
    const { firstName, lastName } = req.body;

    const updatedUser = await userNameUpdate(userId, firstName, lastName);

    if (updatedUser) {
      ResponseHandler.ok(res, updatedUser, "user name changed successfully");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, verifyUser, uploadUserProfile, updateUserName };
