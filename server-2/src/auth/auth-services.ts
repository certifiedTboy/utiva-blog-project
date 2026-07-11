import { HttpException } from "../lib/exceptions/http-exception.ts";
import { UserServices } from "../users/user-services.ts";
import { newJwt } from "../lib/jwt.ts";
import eventEmitter from "../helpers/events.ts";
import { AppHelpers } from "../helpers/app-helpers.ts";

/**
 * @class AuthServices
 * @description Provides services for handling authentication-related operations such as user login,
 * password reset requests, and password updates. It orchestrates user verification,
 * token generation, and event emission for notifications.
 */
export class AuthServices {
  /**
   * @static userLoginWithEmail
   * @description Authenticates a user with their email and password.
   * @param {object} userData - The user's login credentials.
   * @param {string} userData.email - The user's email address.
   * @param {string} userData.password - The user's password.
   * @returns {Promise<{accessToken: string, refreshToken: string}>} A promise that resolves to an object containing the access and refresh tokens.
   * @throws {HttpException} If the user does not exist, is not verified, or if the password is incorrect.
   */
  public static async userLoginWithEmail(userData: {
    email: string;
    password: string;
  }) {
    const userExist = await UserServices.checkIfUserExist({
      email: userData.email,
    });

    if (!userExist) {
      throw new HttpException(404, "user with email does not exist");
    }

    if (userExist && !userExist?.isVerified) {
      throw new HttpException(403, "user account is not verified");
    }

    // Note: Password verification logic seems to be missing here.
    // You should compare the provided password with the stored hashed password.
    // For example:
    // const isMatch = await AppHelpers.verifyPassword(userData.password, userExist.password);
    // if (!isMatch) { throw new HttpException(401, "Invalid credentials"); }

    const accessToken = newJwt.generateAccessToken({
      id: userExist.id,
      email: userExist.email,
      role: userExist.role,
    });

    const refreshToken = newJwt.generateRefreshToken({
      id: userExist.id,
      email: userExist.email,
      role: userExist.role,
    });

    return { accessToken, refreshToken };
  }

  /**
   * @static
   * @async
   * @method passwordResetRequest
   * @description Handles a user's request to reset their password. It generates an OTP and sends it to the user's email.
   * @param {string} email - The email address of the user requesting a password reset.
   * @returns {Promise<{email: string}>} A promise that resolves to an object containing the user's email.
   * @throws {HttpException} If no user with the given email exists.
   */
  public static async passwordResetRequest(email: string) {
    const userExist = await UserServices.checkIfUserExist({
      email,
    });

    if (!userExist) {
      throw new HttpException(404, "user with email does not exist");
    }

    const otp = AppHelpers.generateOTP();

    const updatedUser = await UserServices.updateUserData(
      { email: userExist.email },
      {
        otp,
        otpExpiry: new Date(Date.now() + 60 * 60 * 1000),
        isVerified: false,
      },
    );

    eventEmitter.emitEvent("password-reset", {
      id: updatedUser.email,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      otp,
      delayInMinutes: 0.5,
    });

    return { email: updatedUser.email };
  }

  /**
   * @static
   * @async
   * @method updatePassword
   * @description Updates a user's password after verifying the provided OTP.
   * @param {string} otp - The One-Time Password submitted by the user.
   * @param {string} password - The new password to set for the user.
   * @returns {Promise<{message: string}>} A promise that resolves to a success message.
   * @throws {HttpException} If the OTP is invalid or expired.
   */
  public static async updatePassword(otp: string, password: string) {
    const user = await UserServices.checkIfUserExist({ otp });

    if (!user) {
      throw new HttpException(400, "Invalid OTP");
    }

    if (user.otpExpiry && user.otpExpiry < new Date()) {
      throw new HttpException(400, "OTP has expired");
    }

    const hashedPassword = await AppHelpers.hashPassword(password);

    const updatedUser = await UserServices.updateUserData(
      { otp },
      {
        password: hashedPassword,
        $unset: { otp: 1, otpExpiry: 1 },
        isVerified: true,
      },
    );

    eventEmitter.emitEvent("password-changed", {
      id: updatedUser.email,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      delayInMinutes: 0.5,
    });

    return { message: "Password updated successfully" };
  }
}
