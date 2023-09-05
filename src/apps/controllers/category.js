const paginate = require("../../common/paginate");
const CategoryModel = require("../models/category");
const slug = require("slug");

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
  res.render("admin/categories/add_category", { data: {} });
};
const store = async (req, res) => {
  const { body } = req;
  let error = null;
  const categoryExist = await CategoryModel.find({ title: body.title });
  if (categoryExist.length != 0) {
    error = "Danh mục đã tồn tại!";
    res.render("admin/categories/add_category", { data: { error } });
  } else {
    const category = {
      title: body.title,
      description: null,
      slug: slug(body.title),
    };
    new CategoryModel(category).save();
    res.redirect("/admin/categories");
  }
};
const edit = async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  res.render("admin/categories/edit_category", { category, data: {} });
};
const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let error = null;
  const categoryExist = await CategoryModel.find({ title: body.title });
  const category = await CategoryModel.findById(id);
  if (categoryExist.length != 0 && category.title != categoryExist[0].title) {
    error = "Danh mục đã tồn tại!";
    res.render("admin/categories/edit_category", { category, data: { error } });
  } else {
    const category = {
      title: body.title,
      description: null,
      slug: slug(body.title),
    };
    await CategoryModel.updateOne({ _id: id }, { $set: category });
    res.redirect("/admin/categories");
  }
  res.render("admin/categories/edit_category");
};
const del = async (req, res) => {
  const { id } = req.params;
  await CategoryModel.deleteOne({ _id: id });
  res.redirect("/admin/categories");
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  del,
};
