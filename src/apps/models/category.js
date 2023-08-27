const mongoose = require("../../common/database")();
const categorySchema = mongoose.Schema(
  {
    description: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CategoryModel = mongoose.model("Category", categorySchema, "categories");
module.exports = CategoryModel;
