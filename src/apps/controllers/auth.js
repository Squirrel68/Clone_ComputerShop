const UserModel = require("../models/user");

const getLogin = (req, res) => {
  res.render("admin/login", { data: {} });
};
const postLogin = async (req, res) => {
  const { email, password } = req.body;
  let error = null;
  const users = await UserModel.find({ email, password });
  if (email == "" || password == "") {
    error = "Email hoặc Mật khẩu không được để trống!";
  } else if (users.length > 0 && users[0].role === "admin") {
    // cap quyen
    req.session.email = email;
    req.session.password = password;
    req.session.role = users[0].role;
    // console.log(req.session.role);
    res.redirect("/admin/dashboard");
  } else {
    error = "Tài khoản không hợp lệ!";
  }
  res.render("admin/login", { data: { error } });
};
const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
};

module.exports = {
  getLogin,
  postLogin,
  logout,
};
