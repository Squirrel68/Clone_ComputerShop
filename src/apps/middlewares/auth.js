const checkLogin = (req, res, next) => {
  if (req.session.email && req.session.password) {
    res.redirect("/admin/dashboard");
  }
  next();
};

const checkAdmin = (req, res, next) => {
  if (!req.session.email || !req.session.password) {
    res.redirect("/admin/login");
  }
  next();
};

const restrictTo = (role) => {
  return (req, res, next) => {
    if (req.session.role != role) {
      res.redirect("/admin/login");
    }
    next();
  };
};

module.exports = {
  checkLogin,
  restrictTo,
  checkAdmin,
};
