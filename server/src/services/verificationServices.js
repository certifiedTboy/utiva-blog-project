const { checkThatUserExistById, deleteUserById } = require("./userServices");
const UnprocessableError = require("../lib/errorInstances/UnprocessableError");
const ConflictError = require("../lib/errorInstances/ConflictError");

const verifyUserToken = async (userId, verificationToken) => {
  const user = await checkThatUserExistById(userId);
  if (user) {
    const now = +new Date();
    const verificationTokenExpiryDate = +user.verificationTokenExpiresAt;

    if (now - verificationTokenExpiryDate === 0) {
      await deleteUserById(userId);
      throw UnprocessableError("expired verification token");
    }

    if (user.verificationToken !== verificationToken) {
      throw new ConflictError("invalid verification token");
    }

    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    user.isVerified = true;

    await user.save();

    return { email: user.email };
  }
};

module.exports = { verifyUserToken };
