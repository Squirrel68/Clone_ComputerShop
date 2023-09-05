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
  res.render("admin/users/add_user", { data: {} });
};
const store = async (req, res) => {
  const { body } = req;
  let error = null;
  const userExist = await UserModel.find({ email: body.email });
  if (userExist.length != 0) {
    error = "Email đã tồn tại!";
    res.render("admin/users/add_user", { data: { error } });
  } else if (body.password != body.passwordConfirm) {
    error = "Mật khẩu không khớp!";
    res.render("admin/users/add_user", { data: { error } });
  } else {
    const user = {
      full_name: body.full_name,
      email: body.email,
      password: body.password,
      role: body.role,
    };
    new UserModel(user).save();
    res.redirect("/admin/users");
  }
};
const edit = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  res.render("admin/users/edit_user", { user, data: {} });
};
const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let error = null;
  const user = await UserModel.findById(id);
  const userExist = await UserModel.find({ email: body.email });
  if (userExist.length != 0 && userExist[0].email != user.email) {
    error = "Email đã tồn tại!";
    res.render("admin/users/add_user", { user, data: { error } });
  } else if (body.password != body.passwordConfirm) {
    error = "Mật khẩu không khớp!";
    res.render("admin/users/add_user", { user, data: { error } });
  } else {
    const user = {
      full_name: body.full_name,
      email: body.email,
      password: body.password,
      role: body.role,
    };
    await UserModel.updateOne({ _id: id }, { $set: user });
    res.redirect("/admin/users");
  }
};
const del = async (req, res) => {
  const { id } = req.params;
  await UserModel.deleteOne({ _id: id });
  res.redirect("/admin/users");
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  del,
};
