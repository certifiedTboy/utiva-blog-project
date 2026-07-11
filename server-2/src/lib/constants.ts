import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;

export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
export const EMAIL_FROM = process.env.EMAIL_FROM;
