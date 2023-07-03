const ResponseHandler = require("../lib/generalResponse/ResponseHandler");
const { newUser } = require("../services/userServices");

const createUser = async (req, res, next) => {
  try {
    const { email, firstName, lastName } = req.body;
    const createdUser = await newUser(email, firstName, lastName);
    if (createdUser) {
      //   res.status(200).json({ message: "success", user: createdUser });
      ResponseHandler.created(res, createdUser, "success");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser };
