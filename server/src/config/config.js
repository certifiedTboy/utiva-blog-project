const dotenv = require("dotenv");

dotenv.config();

const { env } = process;

const envVariable = {
  PORT: env.PORT,
  MONGO_URL: env.MONGO_URL,
  SMTP_HOST: env.SMTP_HOST,
  SMTP_USER: env.SMTP_USER,
  SMTP_PASSWORD: env.SMTP_PASSWORD,
  SMTP_PORT: env.SMTP_PORT,
  FRONT_END_URL: env.FRONT_END_URL,
  ACCOUNT_VERIFY_TOKEN_TTL_IN_HOURS: 24,
  PASSWORD_RESET_TOKEN_TTL_IN_HOURS: 1,
  JWT_TOKEN_SECRET: env.JWT_TOKEN_SECRET,
  ACCESS_TOKEN_PRIVATE_KEY: env.ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY: env.ACCESS_TOKEN_PUBLIC_KEY,
  REFRESH_TOKEN_PRIVATE_KEY: env.REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY: env.REFRESH_TOKEN_PUBLIC_KEY,
};

module.exports = envVariable;
