const mongoose = require("../../common/database")();
const commentSchema = new mongoose.Schema(
  {
    prd_id: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    email: {
      type: String,
      default: null,
    },
    body: {
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
const CommentModel = mongoose.model("Comment", commentSchema, "comments");
module.exports = CommentModel;
