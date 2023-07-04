const User = require("../models/user");
const { sendVerificationUrl } = require("./emailServices");
const generateUrl = require("../helpers/verification/verificationUrl");
const UnprocessableError = require("../lib/errorInstances/UnprocessableError");
const NotFoundError = require("../lib/errorInstances/NotFoundError");

const newUser = async (email, firstName, lastName) => {
  const user = await checkThatUserAlreadyExist(email);

  if (!user) {
    const uniqueSuffix = Math.round(Math.random() * 1e9);

    const username = email.split("@")[0] + "-" + uniqueSuffix;
    const newUser = new User({ email, firstName, lastName, username });

    await newUser.save();

    if (newUser) {
      const verificationData = await generateUrl(newUser._id.toString());

      if (verificationData) {
        newUser.verificationToken = verificationData.verificationToken;
        newUser.verificationTokenExpiresAt = verificationData.expiresAt;
        await newUser.save();
        // await sendVerificationUrl(user.email, verificationData.verificationUrl);

        return { email: newUser.email };
      }
    }
  } else if (!user.isVerified) {
    const verificationData = await generateUrl(user._id.toString());
    if (verificationData) {
      user.verificationToken = verificationData.verificationToken;
      user.verificationTokenExpiresAt = verificationData.expiresAt;
      await user.save();
      // await sendVerificationUrl(user.email, verificationData.verificationUrl);

      return { email: user.email };
    }
  } else {
    throw new UnprocessableError("This email address is already registered");
  }
};

const checkThatUserAlreadyExist = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const checkThatUserExistById = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    return user;
  }

  throw new NotFoundError("invalid user token");
};

const deleteUserById = async (userId) => {
  return await User.findByIdAndRemove(userId);
};

module.exports = { newUser, checkThatUserExistById, deleteUserById };