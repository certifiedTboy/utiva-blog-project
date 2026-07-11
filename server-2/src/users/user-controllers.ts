import type { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../lib/response-handler.ts";
import { UserServices } from "./user-services.ts";

/**
 * @class UserControllers
 * @description handles all user related operations
 */
export class UserControllers {
  constructor() {}

  /**
   * @static createNewUser
   * @description handles new account creation for a user
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
   * @static verifyUserAccount
   * @description handler user account verification
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
}
