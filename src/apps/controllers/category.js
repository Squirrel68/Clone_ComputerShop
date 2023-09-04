const paginate = require("../../common/paginate");
const CategoryModel = require("../models/category");

const index = async (req, res) => {
  const limit = 5;
  const page = parseInt(req.query.page) || 1;
  const skip = page * limit - limit;
  const categories = await CategoryModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  const totalRow = await CategoryModel.find().countDocuments();
  const totalPage = Math.ceil(totalRow / limit);
  res.render("admin/categories/category", {
    categories,
    page,
    pages: paginate(page, totalPage),
    totalPage,
    skip,
  });
};
const create = (req, res) => {
  res.render("admin/categories/add_category");
};
const edit = (req, res) => {
  res.render("admin/categories/edit_category");
};
const del = (req, res) => {
  res.send("category-delete");
};

module.exports = {
  index,
  create,
  edit,
  del,
};
