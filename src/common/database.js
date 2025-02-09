const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../../config.env` });

const mongoose = require("mongoose");

const DB = process.env.DATABASE;

module.exports = () => {
  if (process.env.NODE_ENV === "development")
    mongoose.connect(process.env.DATABASE_LOCAL);
  else mongoose.connect(DB);
  return mongoose;
};
