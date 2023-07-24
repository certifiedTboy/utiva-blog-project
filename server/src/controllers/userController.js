const ResponseHandler = require("../lib/generalResponse/ResponseHandler");
const {
  newUser,
  updateUserProfileImage,
  userNameUpdate,
  checkThatUserExistById,
  checkThatUserExistByUsername,
  updateUserAbout,
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
    const userId = req.user.id;
    const { firstName, lastName, about } = req.body;

    const updatedUser = await userNameUpdate(
      userId,
      firstName,
      lastName,
      about
    );

    if (updatedUser) {
      ResponseHandler.ok(res, updatedUser, "user name changed successfully");
    }
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const currentUser = await checkThatUserExistById(userId);

    if (currentUser) {
      ResponseHandler.ok(res, currentUser, "success");
    }
  } catch (error) {
    next(error);
  }
};

const getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await checkThatUserExistByUsername(username);

    if (user) {
      ResponseHandler.ok(res, user, "success");
    }
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await checkThatUserExistById(userId);
    if (user) {
      ResponseHandler.ok(res, user, "success");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  verifyUser,
  uploadUserProfile,
  updateUserName,
  getCurrentUser,
  getUserByUsername,
  getUserById,
};
