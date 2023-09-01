const CategoryModel = require("../models/category");

module.exports = async (req, res, next) => {
  res.locals.categories = await CategoryModel.find();
  res.locals.totalCartItems = req.session.cart.reduce(
    (total, item) => total + item.qty,
    0
  );
  next();
};
