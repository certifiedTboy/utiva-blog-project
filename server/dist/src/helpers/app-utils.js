import mongoose from "mongoose";
import { DB_URI } from "../lib/constants.js";
export class AppUtils {
    static generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    static async connectDb() {
        try {
            if (!DB_URI)
                throw new Error("DB_URI is not defined");
            await mongoose.connect(DB_URI);
            console.log("connected to database");
        }
        catch (error) {
            console.log(error);
        }
    }
}
