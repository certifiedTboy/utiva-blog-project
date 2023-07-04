const { updateUserPassword } = require("../services/authServices");
const ResponseHandler = require("../lib/generalResponse/ResponseHandler");

const setUserPassword = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const updatedUser = await updateUserPassword(email, password);
    if (updatedUser) {
      ResponseHandler.ok(
        res,
        {},
        "Registration successful, sign in to continue enjoying our services"
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { setUserPassword };
