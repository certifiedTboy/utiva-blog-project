import type { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../lib/response-handler.ts";
import { UserServices } from "./user-services.ts";

/**
 * @class UserControllers
 * @description A class that contains static methods for handling user-related HTTP requests.
 * It serves as the controller layer for user management, processing requests for user creation,
 * verification, and profile retrieval.
 */
export class UserControllers {
  constructor() {}

  /**
   * @static
   * @async
   * @method createNewUser
   * @description Handles the creation of a new user account. It extracts user data from the
   * request body, calls the user service to create the user, and sends a success response.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next middleware function.
   */
  public static async createNewUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const result = await UserServices.createUser({
        firstName,
        lastName,
        email,
        password,
      });

      ResponseHandler.created(res, 201, "user created successfully", result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static
   * @async
   * @method verifyUserAccount
   * @description Handles user account verification using an OTP. It extracts the OTP from the
   * request body, calls the service to verify the user, and returns a success response.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next middleware function.
   */
  public static async verifyUserAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { otp } = req.body;

      const result = await UserServices.verifyUser(otp);

      ResponseHandler.ok(res, 200, "user verified successfully", result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static
   * @async
   * @method getCurrentUserProfile
   * @description Handles the request to fetch the profile of the currently authenticated user.
   * It retrieves the user's email from the request object (attached by auth middleware) and fetches the profile.
   * @param {Request} req - The Express request object, expected to have a `user` property.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next middleware function.
   */
  public static async getCurrentUserProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const email = req?.user?.email;

      const result = await UserServices.checkIfUserExist({
        email,
      });

      ResponseHandler.ok(res, 200, "user profile fetched successfully", result);
    } catch (error) {
      next(error);
    }
  }
}
