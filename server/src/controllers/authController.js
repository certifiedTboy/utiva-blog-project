const {
  updateUserPassword,
  loginUser,
  logoutUser,
  requestPasswordReset,
  authenticateWithGoogle,
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
  const userAgents = req.headers["user-agent"];
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip;

    const data = await loginUser(email, password, ipAddress);

    if (data) {
      const jwtTokenOptions = {
        expires: data.userSession.expiresAt,
        maxAge: 59 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      ResponseHandler.authenticated(
        res,
        data,
        jwtTokenOptions,
        "login success"
      );
    }
  } catch (error) {
    next(error);
  }
};

const loginWithGoogle = async (req, res, next) => {
  const { token } = req.body;
  const ipAddress = req.ip;
  try {
    const data = await authenticateWithGoogle(token, ipAddress);

    if (data) {
      const jwtTokenOptions = {
        expires: data.userSession.expiresAt,
        maxAge: 59 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      ResponseHandler.authenticated(
        res,
        data,
        jwtTokenOptions,
        "login success"
      );
    }
  } catch (error) {
    next(error);
  }
};

const userLogout = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const response = await logoutUser(cookies.authToken);
    if (response) {
      const jwtTokenOptions = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      ResponseHandler.clearCookie(res, {}, jwtTokenOptions, "logout success");
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
  userLogout,
  passwordResetRequest,
  verifyPasswordResetData,
  loginWithGoogle,
};
