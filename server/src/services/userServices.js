const User = require("../models/user");
const UnprocessableError = require("../lib/errorInstances/UnprocessableError");

const newUser = async (email, firstName, lastName) => {
  await checkThatUserAlreadyExist(email);
  const uniqueSuffix = Math.round(Math.random() * 1e9);

  const username = email.split("@")[0] + "-" + uniqueSuffix;
  const user = new User({ email, firstName, lastName, username });
  await user.save();

  if (user) {
    return user;
  }
};

const checkThatUserAlreadyExist = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new UnprocessableError("This email address is already registered");
  }
};

module.exports = { newUser };
