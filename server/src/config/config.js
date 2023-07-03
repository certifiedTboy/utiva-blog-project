const dotenv = require("dotenv");

dotenv.config();

const { env } = process;

const envVariable = {
  PORT: env.PORT,
  MONGO_URL: env.MONGO_URL,
};

module.exports = envVariable;
