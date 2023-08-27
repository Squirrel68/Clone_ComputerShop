const CommentModel = require("../models/comment");
const ProductModel = require("../models/product");
const UserModel = require("../models/user");

const index = async (req, res) => {
  const products = (await ProductModel.find()).length;
  const comments = (await CommentModel.find()).length;
  const users = (await UserModel.find()).length;
  res.render("admin/dashboard", { products, comments, users });
};

module.exports = {
  index,
};
