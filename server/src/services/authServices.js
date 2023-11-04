const {
  checkThatUserIsVerified,
  checkUserForNewPassword,
  checkThatUserAlreadyExist,
  updateUserProfileImage,
} = require("./userServices");
const {
  hashPassword,
  verifyPassword,
} = require("../helpers/general/passwordHelpers");
const { verifyToken } = require("../helpers/JWT/jwtHelpers");
const generatePasswordResetUrl = require("../helpers/url-generator/passwordResetUrl");
const {
  createOrUpdatePlatformSession,
  deleteSessionByUserId,
} = require("./sessionServices");
const UnprocessableError = require("../lib/errorInstances/UnprocessableError");
const verifyGoogleToken = require("../helpers/JWT/googleJwt");
const { sendPasswordResetUrl } = require("./emailServices");
const User = require("../models/user");

const updateUserPassword = async (email, password) => {
  const user = await checkUserForNewPassword(email);

  if (user) {
    const hashedPassword = await hashPassword(password);
    if (hashedPassword) {
      if (!user.password) {
        /// user password update for first time registration
        user.password = hashedPassword;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        user.isVerified = true;

        await user.save();
        return user;
      } else {
        if (user.resetPasswordToken) {
          // user password update for password reset request
          user.password = hashedPassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          await user.save();
          return user;
        } else {
          throw new UnprocessableError(
            "You have not requested for a password reset"
          );
        }
      }
    }
  }
};

const loginUser = async (email, password, ipAddress) => {
  const user = await checkThatUserIsVerified(email);
  if (user) {
    verifyPassword(password, user.password);

    const userSession = await createOrUpdatePlatformSession(
      user._id.toString(),
      ipAddress
    );

    const userData = {
      username: user.username,
      userType: user.userType,
    };

    if (userSession) {
      return { userData, userSession };
    }
  }
};

const authenticateWithGoogle = async (token, ipAddress) => {
  const decodedToken = decodeURIComponent(token);
  const { firstName, lastName, email, profilePicture } =
    await verifyGoogleToken(decodedToken);

  if (firstName || lastName) {
    const user = await checkThatUserAlreadyExist(email);

    if (user) {
      const userSession = await createOrUpdatePlatformSession(
        user._id.toString(),
        ipAddress
      );
      await updateUserProfileImage(user._id, profilePicture);
      const userData = {
        username: user.username,
        userType: user.userType,
      };
      if (userSession) {
        return { userData, userSession };
      }
    }

    const uniqueSuffix = Math.round(Math.random() * 1e9);

    const userData = {
      firstName,
      lastName,
      email,
      profilePicture,
      username: email.split("@")[0] + "-" + uniqueSuffix,
      isVerified: true,
    };

    const newUser = new User(userData);
    await newUser.save();

    if (newUser) {
      const userSession = await createOrUpdatePlatformSession(
        newUser._id.toString(),
        ipAddress
      );
      const userData = {
        username: newUser.username,
        userType: newUser.userType,
      };

      if (userSession) {
        return { userData, userSession };
      }
    }
  }
};

const logoutUser = async (refreshToken) => {
  const authPayload = verifyToken(refreshToken);
  return await deleteSessionByUserId(authPayload?.id);
};

const requestPasswordReset = async (email) => {
  const user = await checkThatUserIsVerified(email);

  if (user) {
    const passwordResetData = await generatePasswordResetUrl(
      user._id.toString()
    );

    if (passwordResetData) {
      if (passwordResetData) {
        user.resetPasswordToken = passwordResetData.passwordResetToken;
        user.resetPasswordExpires = passwordResetData.expiresAt;
        await user.save();
        await sendPasswordResetUrl(
          user.email,
          passwordResetData.passwordResetUrl
        );

        return { email: user.email };
      }
    }
  }
};

module.exports = {
  updateUserPassword,
  loginUser,
  requestPasswordReset,
  logoutUser,
  authenticateWithGoogle,
};
