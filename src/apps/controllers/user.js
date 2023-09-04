const paginate = require("../../common/paginate");
const UserModel = require("../models/user");

const index = async (req, res) => {
  const limit = 5;
  const page = parseInt(req.query.page) || 1;
  const skip = page * limit - limit;
  const totalRow = await UserModel.find().countDocuments();
  const totalPage = Math.ceil(totalRow / limit);
  const users = await UserModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  res.render("admin/users/user", {
    users,
    page,
    pages: paginate(page, totalPage),
    totalPage,
    skip,
  });
};
const create = (req, res) => {
  res.render("admin/users/add_user");
};
const edit = (req, res) => {
  res.render("admin/users/edit_user");
};
const del = (req, res) => {
  res.send("user-delete");
};

module.exports = {
  index,
  create,
  edit,
  del,
};
