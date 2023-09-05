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
    passwordConfirm: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
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
