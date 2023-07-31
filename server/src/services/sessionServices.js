const UserSession = require("../models/userSession");
const User = require("../models/user");
const dateTimeCalculator = require("../helpers/general/dateAndTimeCalculator");
const { generateJWTToken } = require("../helpers/JWT/jwtHelpers");
const NotFoundError = require("../lib/errorInstances/NotFoundError");

const createOrUpdatePlatformSession = async (userId, ipAddress) => {
  let userSession = await getUserPlatformSession(userId);

  const AUTH_TOKEN_TTL_IN_HOURS = 24;
  const AUTH_TOKEN = await getAuthToken(userId, AUTH_TOKEN_TTL_IN_HOURS);

  userSession.token = AUTH_TOKEN;
  userSession.ipAddress = ipAddress;

  userSession.expiresAt = dateTimeCalculator(AUTH_TOKEN_TTL_IN_HOURS);

  return userSession.save();
};

const getUserPlatformSession = async (userId) => {
  let userSession = await UserSession.findOne({ userId });

  if (!userSession) {
    userSession = new UserSession();
    userSession.userId = userId;
    await userSession.save();
  }

  return userSession;
};

const deleteSessionByUserId = async (userId) => {
  const userSession = await UserSession.findOne({ userId });
  if (!userSession) {
    throw new NotFoundError("user session does not exist");
  }
  return await UserSession.findByIdAndRemove(userSession?._id.toString());
};

const getAuthToken = async (userId, ttlInHours) => {
  const user = await User.findById(userId);
  if (user) {
    const PAYLOAD = { id: user._id.toString(), userType: user.userType };

    return generateJWTToken(PAYLOAD, `${ttlInHours}h`);
  }
};

module.exports = { createOrUpdatePlatformSession, deleteSessionByUserId };
