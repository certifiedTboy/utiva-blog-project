const bcrypt = require("bcryptjs");

const hashPassword = (plainTextPasword) => {
  if (!plainTextPasword) {
    throw new Error("Invalid plain-text password");
  }
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainTextPasword, salt);
};

const verifyPassword = (plainTextPasword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPasword, hashedPassword);
};

module.exports = { hashPassword, verifyPassword };
