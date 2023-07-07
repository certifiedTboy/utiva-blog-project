const transport = require("../helpers/smtp/SMTPTransport");
const envVariable = require("../config/config");

const { SMTP_USER } = envVariable;

const sendVerificationUrl = async (email, verificationUrl) => {
  const mailOptions = {
    to: email,
    from: SMTP_USER,
    subject: "Welcome to WedDev Blog",
    html: `<div><p> Dear <strong>Valid user</strong> </p>
            <h4> You are a step closer !!! </h4>
            <p> Use the button below to complete your account</p>
            <a href=${verificationUrl}>Create Account</a>
            <p>Thanks </p>.
            <div>`,
  };

  await transport.sendMail(mailOptions);
};

const sendPasswordResetUrl = async (email, passwordResetUrl) => {
  const mailOptions = {
    to: email,
    from: SMTP_USER,
    subject: "Password Reset Request",
    html: `<div><p> Dear <strong>Valid user</strong> </p>
                <p> You recently requested for password reset, if this is you, Click on the link below to complete the request</p>
            <a href=${passwordResetUrl}>ResetPassword</a>


            <p> If you're unaware, kindly ignore this mail </p>
            <p>Thanks </p>.
            <div>`,
  };

  await transport.sendMail(mailOptions);
};

module.exports = { sendVerificationUrl, sendPasswordResetUrl };
