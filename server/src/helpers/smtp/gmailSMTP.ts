const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {
  GOOGLE_OAUTH_ACCESS_TOKEN,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URI,
  GOOGLE_OAUTH_REFRESH_TOKEN,
  GOOGLE_OAUTH_CLIENT_ID,
  SMTP_HOST2,
  SMTP_USER,
} = require("../../config/config");

const Oauth2 = google.auth.OAuth2;

const myOauth2Client = new Oauth2(
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URI
);

myOauth2Client.setCredentials({ refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN });

const transport = nodemailer.createTransport({
  service: SMTP_HOST2,
  auth: {
    type: "OAuth2",
    user: SMTP_USER,
    clientId: GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
    refreshToken: GOOGLE_OAUTH_REFRESH_TOKEN,
    accessToken: GOOGLE_OAUTH_ACCESS_TOKEN,
  },
});

module.exports = transport;
