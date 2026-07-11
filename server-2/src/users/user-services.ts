import { HttpException } from "../lib/exceptions/http-exception.ts";
import { type IUser } from "../lib/types.ts";
import User from "./user.model.ts";
import { AppHelpers } from "../helpers/app-helpers.ts";
import eventEmitter from "../helpers/events.ts";

/**
 * @class UserServices
 * @description handles user related operation on the database
 */
export class UserServices {
  public static async createUser(userData: IUser) {
    const userExist = await this.checkIfUserExistByEmail(userData.email);

    if (userExist && userExist?.verified) {
      throw new HttpException(409, "User already exist");
    }

    const newUser = await User.findOneAndUpdate(
      { email: userData.email },
      {
        ...userData,
        otp: AppHelpers.generateOTP(),
        otpExpiry: new Date(Date.now() + 60 * 60 * 1000),
        password: await AppHelpers.hashPassword(userData.password),
      },
      { returnDocument: "after", upsert: true },
    );

    if (!newUser) {
      throw new HttpException(500, "error creating user");
    }

    eventEmitter.emitEvent("new-user", {
      email: newUser.email,
      firstName: newUser.firstName,
      otp: newUser.otp!,
    });

    return { email: newUser.email };
  }

  public static async verifyUser(otp: string) {
    const user = await this.checkIfUserExist({ otp });

    if (!user) {
      throw new HttpException(404, "user not found");
    }

    if (user.verified) {
      throw new HttpException(409, "user already verified");
    }

    if (user.otpExpiry && user.otpExpiry < new Date()) {
      throw new HttpException(409, "otp expired");
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return user;
  }

  private static async checkIfUserExistByEmail(email: string) {
    return await User.findOne({ email });
  }

  public static async checkIfUserExist(query: any) {
    return await User.findOne<any>(query);
  }
}
