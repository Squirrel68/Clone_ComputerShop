const index = (req, res) => {
  res.render("admin/users/user");
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
