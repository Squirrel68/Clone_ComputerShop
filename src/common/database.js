const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../../config.env` });

const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

module.exports = () => {
  // console.log(DB);
  mongoose.connect(DB);
  // mongoose.connect(process.env.DATABASE_LOCAL);
  return mongoose;
};
