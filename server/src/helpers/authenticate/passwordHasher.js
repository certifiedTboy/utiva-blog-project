const bcrypt = require("bcryptjs");

const hash = (plainTextPasword) => {
  if (!plainTextPasword) {
    throw new Error("Invalid plain-text password");
  }
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainTextPasword, salt);
};

const verify = (plainTextPasword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPasword, hashedPassword);
};

module.exports = { hash, verify };
