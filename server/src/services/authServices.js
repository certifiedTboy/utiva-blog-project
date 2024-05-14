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
const generateVerificationUrl = require("../helpers/url-generator/verificationUrl");
const verifyGoogleToken = require("../helpers/JWT/googleJwt");
const {
  sendPasswordResetUrl,
  sendVerificationUrl,
} = require("./emailServices");
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
  // decode google authentication uri from client
  const decodedToken = decodeURIComponent(token);

  // desctructure user data from decoded token
  const { firstName, lastName, email, profilePicture } =
    await verifyGoogleToken(decodedToken);

  if (firstName || lastName) {
    // check if user already exist on database
    const user = await checkThatUserAlreadyExist(email);

    if (user) {
      // check if user already verified after first sign up
      if (user.isVerified) {
        // generate new session data if user is verified
        const userSession = await createOrUpdatePlatformSession(
          user._id.toString(),
          ipAddress
        );

        // update user profile image with current google profile image
        await updateUserProfileImage(user._id, profilePicture);
        const userData = {
          username: user.username,
          userType: user.userType,
        };

        // send back user data and session data if user is verified and logged in successfuly
        if (userSession) {
          return { userData, userSession };
        }
      } else {
        // generate new verification url if user is not verified on first login with google
        const verificationData = await generateVerificationUrl(
          user._id.toString()
        );
        if (verificationData) {
          // update user information with verification data
          user.verificationToken = verificationData.verificationToken;
          user.verificationTokenExpiresAt = verificationData.expiresAt;
          await user.save();

          // resend verification url to user email
          await sendVerificationUrl(
            user.email,
            verificationData.verificationUrl
          );

          return { email: user.email };
        }
      }
    }

    // create new user profile for first time google authentication
    const uniqueSuffix = Math.round(Math.random() * 1e9);

    const userData = {
      firstName,
      lastName,
      email,
      profilePicture,
      username: email.split("@")[0] + "-" + uniqueSuffix,
    };

    const newUser = new User(userData);

    const verificationData = await generateVerificationUrl(
      newUser._id.toString()
    );

    if (verificationData) {
      newUser.verificationToken = verificationData?.verificationToken;
      newUser.verificationTokenExpiresAt = verificationData?.expiresAt;

      await newUser.save();

      if (newUser) {
        await sendVerificationUrl(
          newUser?.email,
          verificationData.verificationUrl
        );

        return { email: newUser.email };
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
