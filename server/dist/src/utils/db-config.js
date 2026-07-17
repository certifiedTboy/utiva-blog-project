import mongoose from "mongoose";
import { DB_URI } from "../lib/constants.js";
export async function connectDB() {
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
