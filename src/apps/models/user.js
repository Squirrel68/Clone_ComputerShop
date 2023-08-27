const mongoose = require("../../common/database")();

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema, "users");
module.exports = UserModel;
