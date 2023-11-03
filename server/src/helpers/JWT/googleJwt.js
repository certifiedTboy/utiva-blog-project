const { OAuth2Client } = require("google-auth-library");
const envVariable = require("../../config/config");
const client = new OAuth2Client(envVariable.GOOGLE_OAUTH_CLIENT_SECRET);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: envVariable.GOOGLE_OAUTH_CLIENT_ID,
  });

  const { given_name, family_name, email, picture } = ticket.getPayload();

  const userData = {
    firstName: given_name,
    lastName: family_name,
    email,
    profilePicture: picture,
  };

  return userData;
};

module.exports = verifyGoogleToken;
