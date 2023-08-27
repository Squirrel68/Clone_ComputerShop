const express = require("express");
const router = express.Router();

// Import Controllers
const TestController = require("./../apps/controllers/test");
const AdminController = require("./../apps/controllers/admin");
const AuthController = require("./../apps/controllers/auth");

const ProductController = require("./../apps/controllers/product");
const CategoryController = require("./../apps/controllers/category");
const UserController = require("./../apps/controllers/user");

// Import Middleware
const AuthMiddleware = require("./../apps/middlewares/auth");
const UploadMiddleware = require("./../apps/middlewares/upload");

router.get("/", (req, res) => {
  res.send("<h1> Hello world!</h1>");
});
router.get("/test", TestController.test);
router.get("/test1", TestController.test1);
router.get("/test2", TestController.test2);

// 1.1) Admin router
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.getLogin);
router.post(
  "/admin/login",
  AuthMiddleware.checkLogin,
  AuthController.postLogin
);
router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);
router.get(
  "/admin/dashboard",
  AuthMiddleware.checkAdmin,
  AdminController.index
);

// 1.2) Admin products
router.get(
  "/admin/products",
  AuthMiddleware.checkAdmin,
  ProductController.index
);
router.get(
  "/admin/products/create",
  AuthMiddleware.checkAdmin,
  ProductController.create
);
router.post(
  "/admin/products/store",
  AuthMiddleware.checkAdmin,
  UploadMiddleware.single("thumbnail"),
  ProductController.store
);
router.get(
  "/admin/products/edit/:id",
  AuthMiddleware.checkAdmin,
  ProductController.edit
);
router.post(
  "/admin/products/update/:id",
  AuthMiddleware.checkAdmin,
  UploadMiddleware.single("thumbnail"),
  ProductController.update
);
router.get(
  "/admin/products/delete/:id",
  AuthMiddleware.checkAdmin,
  ProductController.del
);

// 1.3) Admin users
router.get("/admin/users", AuthMiddleware.checkAdmin, UserController.index);
router.get(
  "/admin/users/create",
  AuthMiddleware.checkAdmin,
  UserController.create
);
router.get(
  "/admin/users/edit/:id",
  AuthMiddleware.checkAdmin,
  UserController.edit
);
router.get(
  "/admin/users/delete/:id",
  AuthMiddleware.checkAdmin,
  UserController.del
);

// 1.4) Admin categories
router.get(
  "/admin/categories",
  AuthMiddleware.checkAdmin,
  CategoryController.index
);
router.get(
  "/admin/categories/create",
  AuthMiddleware.checkAdmin,
  CategoryController.create
);
router.get(
  "/admin/categories/edit/:id",
  AuthMiddleware.checkAdmin,
  CategoryController.edit
);
router.get(
  "/admin/categories/delete/:id",
  AuthMiddleware.checkAdmin,
  CategoryController.del
);

module.exports = router;
