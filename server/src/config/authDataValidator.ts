import { Request, Response, NextFunction } from "express";
import UnprocessableError from "../../lib/errorInstances/UnprocessableError";

export const checkUserDataInputIsEmpty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      throw new UnprocessableError("All input fields are required");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const checkEmailValidity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new UnprocessableError("Email field is required");
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

export const checkAcceptTerms = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { acceptTerms } = req.body;
  try {
    if (!acceptTerms) {
      throw new UnprocessableError(
        "You're yet to accept our terms and conditions",
      );
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const checkPasswordValidity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
      throw new UnprocessableError("Invalid password format");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const checkPasswordMatch = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw new UnprocessableError("Password does not match");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const checkNameDataLength = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
        "Names should not contain special characters or numbers",
      );
    }

    if (firstName.length > 40 || lastName.length > 40) {
      throw new UnprocessableError( // eslint-disable-line @typescript-eslint/no-throw-literal
        "name should not be longer than 40 characters",
      );
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const checkUserDataInputForUpdateIsEmpty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, about } = req.body;
    if (!firstName || !lastName || !about) {
      throw new UnprocessableError("All input fields are required");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
