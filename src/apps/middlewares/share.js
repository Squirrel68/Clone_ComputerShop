const CategoryModel = require("../models/category");

module.exports = async (req, res, next) => {
  res.locals.categories = await CategoryModel.find();
  next();
};
