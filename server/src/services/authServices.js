const { checkThatUserIsVerified } = require("./userServices");
const {
  hashPassword,
  verifyPassword,
} = require("../helpers/general/passwordHelpers");

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

module.exports = { updateUserPassword };
