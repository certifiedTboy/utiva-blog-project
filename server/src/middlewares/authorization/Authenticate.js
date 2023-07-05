const { verifyToken } = require("../../helpers/JWT/jwtHelpers");

const Authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const authToken = checkThatValidTokenFormatIsProvided(authHeader);
    const authPayload = verifyToken(authToken);
    req.user = authPayload;
    next();
  } catch (err) {
    next(err);
  }
};

const checkThatValidTokenFormatIsProvided = (authToken) => {
  let splitToken;

  if (
    !authToken ||
    (splitToken = authToken.split(" ")).length !== 2 ||
    splitToken[0].toLowerCase() !== "bearer" ||
    !splitToken[1]
  ) {
    throw new Error("Invalid token!");
  }

  return splitToken[1];
};

module.exports = Authenticate;
