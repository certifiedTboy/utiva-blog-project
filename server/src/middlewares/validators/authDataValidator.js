const UnprocessableError = require("../../lib/errorInstances/UnprocessableError");

const checkEmailValidity = async (req, res, next) => {
  const { email } = req.body;
  try {
    const emailIsValid = email.includes("@");
    if (!emailIsValid) {
      throw new UnprocessableError("invalid email format");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkPasswordValidity = async (req, res, next) => {
  const { password } = req.body;
  try {
    const passcodeLengthIsValid = password.trim().length < 8;
    const valid = {
      hasUpper: /[A-Z]/,
      hasLower: /[a-z]/,
      hasNumber: /[0-9]/,
      hasSpclChr: /[@,#,$,%,&]/,
    };
    if (
      passcodeLengthIsValid ||
      !password.match(valid.hasUpper) ||
      !password.match(valid.hasLower) ||
      !password.match(valid.hasNumber) ||
      !password.match(valid.hasSpclChr)
    ) {
      throw new UnprocessableError("invalid password format");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkPasswordMatch = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw new UnprocessableError("password does not match");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkNameDataLength = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;

    if (firstName.length > 40 || lastName.length > 40) {
      throw new UnprocessableError(
        "name should not be longer than 40 characters"
      );
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkEmailValidity,
  checkPasswordValidity,
  checkPasswordMatch,
  checkNameDataLength,
};
