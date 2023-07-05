const { checkThatUserIsVerified } = require("./userServices");
const {
  hashPassword,
  verifyPassword,
} = require("../helpers/general/passwordHelpers");

const createOrUpdatePlatformSession = require("./sessionServices");

const updateUserPassword = async (email, password) => {
  const user = await checkThatUserIsVerified(email);

  if (user) {
    const hashedPassword = await hashPassword(password);
    if (hashedPassword) {
      user.password = hashedPassword;
      await user.save();
      return user;
    }
  }
};

const loginUser = async (email, password, ipAddress) => {
  const user = await checkThatUserIsVerified(email);
  if (user) {
    await verifyPassword(password, user.password);

    const userSession = await createOrUpdatePlatformSession(
      user._id.toString(),
      ipAddress
    );

    const userData = {
      username: user.username,
      userType: user.userType,
    };

    if (userSession) {
      return { userData, authToken: userSession.token };
    }
  }
};

module.exports = { updateUserPassword, loginUser };
