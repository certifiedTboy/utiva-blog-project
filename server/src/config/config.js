const dotenv = require("dotenv");

dotenv.config();

const { env } = process;

const envVariable = {
  PORT: env.PORT,
};

module.exports = envVariable;
