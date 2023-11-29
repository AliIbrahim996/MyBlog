const nodemailer = require("nodemailer");

const MAILER_HOST = process.env.MAILER_HOST || "smtp.gmail.com";
const MAILER_PORT = process.env.MAILER_PORT || 465;
const MAILER_USER_NAME = process.env.MAILER_USER_NAME || "MyBlogApp";
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID || "OAUTH_CLIENT_ID";
const OAUTH_CLIENT_SECRET =
  process.env.OAUTH_CLIENT_SECRET || "OAUTH_CLIENT_SECRET";
const OAUTH_REFRESH_TOKEN =
  process.env.OAUTH_REFRESH_TOKEN || "OAUTH_REFRESH_TOKEN";

const OAUTH_ACCESS_TOKEN =
  process.env.OAUTH_ACCESS_TOKEN || "OAUTH_ACCESS_TOKEN";

const sendCodeViaEmail = async (receiverEmail, resetCode) => {
  try {
    var transporter = nodemailer.createTransport({
      host: MAILER_HOST,
      port: MAILER_PORT,
      secure: true,
      auth: {
        type: "OAuth2",
        user: MAILER_USER_NAME,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessToken: OAUTH_ACCESS_TOKEN,
      },
    });

    const mail = {
      from: "Blog App",
      to: receiverEmail,
      subject: "Password Reset",
      text: `Your password reset code is: ${resetCode}`,
    };

    transporter.verify().then(console.log).catch(console.error);

    await transporter.sendMail(mail);
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendCodeViaEmail;
