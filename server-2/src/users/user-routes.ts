import { body } from "express-validator";
import { UserControllers } from "./user-controllers.ts";
import { AppRoutesHandler } from "../lib/app-routes-middlewares.ts";

export class UserRoutes extends AppRoutesHandler {
  constructor() {
    super();
    this.featureRoutes();
  }

  private featureRoutes() {
    this.routes.post(
      "/",
      this.getCreateUserValidationRules(),
      this.checkValidationResult,
      UserControllers.createNewUser,
    );
    this.routes.put(
      "/verify",
      this.getVerifyUserValidationRules(),
      this.checkValidationResult,
      UserControllers.verifyUserAccount,
    );

    this.routes.get(
      "/profile",
      this.authGuard,
      UserControllers.getCurrentUserProfile,
    );
  }

  private getCreateUserValidationRules() {
    return [
      body("firstName").notEmpty().withMessage("first name is required"),
      body("lastName").notEmpty().withMessage("last name is required"),
      body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email address"),
      body("password")
        .notEmpty()
        .withMessage("password is required")
        .matches(/^.{8,}$/)
        .withMessage("Password must be at least 8 characters long")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[^A-Za-z0-9]/)
        .withMessage("Password must contain at least one special character"),

      body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
    ];
  }

  private getVerifyUserValidationRules() {
    return [
      body("otp")
        .notEmpty()
        .withMessage("otp is required")
        .matches(/^[0-9]{6}$/)
        .withMessage("Invalid otp"),
    ];
  }
}
