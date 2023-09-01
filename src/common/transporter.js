const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../../config.env` });

const transporter = nodemailer.createTransport({
  post: 587,
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: "anhtu211168@gmail.com",
    pass: "abvbjagyswuiprfg",
  },
});
module.exports = transporter;
