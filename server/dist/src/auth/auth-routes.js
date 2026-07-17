import { body } from "express-validator";
import { AuthControllers } from "./auth-controllers.js";
import { AppRoutesHandler } from "../lib/app-routes-middlewares.js";
/**
 * @class AuthRoutes
 * @extends AppRoutesHandler
 * @description A class to handle the authentication-related routes for the application.
 * It sets up endpoints for user login, password reset requests, and password updates.
 */
export class AuthRoutes extends AppRoutesHandler {
    constructor() {
        super();
        this.featureRoutes();
    }
    /**
     * @private featureRoutes
     * @description Sets up the specific routes for authentication features, including their validation middleware.
     */
    featureRoutes() {
        this.routes.post("/login", this.getLoginUserValidationRules(), this.checkValidationResult, AuthControllers.loginUserWithEmail);
        this.routes.post("/login/google", this.getGoogleLoginValidationRules(), this.checkValidationResult, AuthControllers.loginUserWithGoogle);
        this.routes.patch("/password-reset", this.getPasswordResetValidationRules(), this.checkValidationResult, AuthControllers.requestPasswordReset);
        this.routes.patch("/update-password", this.getUpdatePasswordValidationRules(), this.checkValidationResult, AuthControllers.updateUserPassword);
        this.routes.get("/new-access-token", this.refreshTokenGuard, AuthControllers.getNewAccessToken);
    }
    /**
     * @private getLoginUserValidationRules
     * @description Returns an array of validation rules for the user login endpoint.
     * @returns {Array} An array of express-validator middleware.
     */
    getLoginUserValidationRules() {
        return [
            body("email")
                .notEmpty()
                .withMessage("email is required")
                .isEmail()
                .withMessage("invalid email address"),
            body("password").notEmpty().withMessage("password is required"),
        ];
    }
    /**
     * @private getPasswordResetValidationRules
     * @description Returns an array of validation rules for the password reset request endpoint.
     * @returns {Array} An array of express-validator middleware.
     */
    getPasswordResetValidationRules() {
        return [
            body("email")
                .notEmpty()
                .withMessage("email is required")
                .isEmail()
                .withMessage("invalid email address"),
        ];
    }
    /**
     * @private getUpdatePasswordValidationRules
     * @description Returns an array of validation rules for the password update endpoint.
     * @returns {Array} An array of express-validator middleware.
     */
    getUpdatePasswordValidationRules() {
        return [
            body("otp")
                .notEmpty()
                .withMessage("otp is required")
                .matches(/^[0-9]{6}$/)
                .withMessage("Invalid otp"),
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
    /**
     * @private getGogleLoginValidationRules
     * @description Returns an array of validation rules for the google login endpoin.
     * @returns {Array} An array of express-validator middleware.
     */
    getGoogleLoginValidationRules() {
        return [body("token").notEmpty().withMessage("token is required")];
    }
}
