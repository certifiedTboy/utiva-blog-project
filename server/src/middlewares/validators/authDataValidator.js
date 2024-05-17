const UnprocessableError = require("../../lib/errorInstances/UnprocessableError");

const checkUserDataInputIsEmpty = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      throw new UnprocessableError("all input fields are required");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkEmailValidity = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new UnprocessableError("email field is required");
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      throw new UnprocessableError("Invalid email address");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkAcceptTerms = async (req, res, next) => {
  const { acceptTerms } = req.body;
  try {
    if (!acceptTerms) {
      throw new UnprocessableError(
        "You're yet to accept our terms and conditions"
      );
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
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const num = /\d/g;

    if (
      firstName.match(format) ||
      lastName.match(format) ||
      firstName.match(num) ||
      lastName.match(num)
    ) {
      throw new UnprocessableError(
        "names should not contain special characters or numbers"
      );
    }

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

const checkUserDataInputForUpdateIsEmpty = async (req, res, next) => {
  try {
    const { firstName, lastName, about } = req.body;
    if (!firstName || !lastName || !about) {
      throw new UnprocessableError("all input fields are required");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkUserDataInputIsEmpty,
  checkEmailValidity,
  checkPasswordValidity,
  checkPasswordMatch,
  checkNameDataLength,
  checkAcceptTerms,
  checkUserDataInputForUpdateIsEmpty,
};
