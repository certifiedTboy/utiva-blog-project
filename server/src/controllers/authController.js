const {
  updateUserPassword,
  loginUser,
  requestPasswordReset,
} = require("../services/authServices");
const {
  verifyPasswordResetToken,
} = require("../services/verificationServices");
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

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip;

    const data = await loginUser(email, password, ipAddress);

    if (data) {
      ResponseHandler.ok(res, data, "login successful");
    }
  } catch (error) {
    next(error);
  }
};

const passwordResetRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await requestPasswordReset(email);

    if (response) {
      ResponseHandler.ok(
        res,
        response,
        `A mail has been sent to ${response.email} to complete your request`
      );
    }
  } catch (error) {
    next(error);
  }
};

const verifyPasswordResetData = async (req, res, next) => {
  try {
    const { userId, passwordResetToken } = req.body;
    const response = await verifyPasswordResetToken(userId, passwordResetToken);

    if (response) {
      ResponseHandler.ok(
        res,
        { email: response.email },
        "Select a new password"
      );
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  setUserPassword,
  userLogin,
  passwordResetRequest,
  verifyPasswordResetData,
};
