import mongoose from "mongoose";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { DB_URI } from "../lib/constants.ts";

const scryptAsync = promisify(scrypt);

export class AppHelpers {
  static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async connectDb(): Promise<void> {
    try {
      if (!DB_URI) throw new Error("DB_URI is not defined");
      await mongoose.connect(DB_URI);

      console.log("connected to database");
    } catch (error) {
      console.log(error);
    }
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");

    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString("hex")}.${salt}`;
  }

  static async verifyPassword(
    providedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");

    const buffer = (await scryptAsync(providedPassword, salt!, 64)) as Buffer;

    return buffer.toString("hex") === hashedPassword;
  }
}
