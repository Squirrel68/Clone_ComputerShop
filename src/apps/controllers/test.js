const CategoryModel = require("../models/category");
const CommentModel = require("../models/comment");
const ProductModel = require("../models/product");
const UserModel = require("../models/user");

const test = (req, res) => {
  req.session.email = "atu@gmail.com";
  res.send("Session defined" + req.session.email);
};
const test1 = (req, res) => {
  if (req.session.email) {
    res.send("Session defined" + req.session.email);
  } else {
    res.send("Session not define 404");
  }
};
const test2 = (req, res) => {
  req.session.destroy();
  res.send("session destroyed");
};

module.exports = {
  test1,
  test,
  test2,
};
