const express = require("express");
const router = express.Router();

// Import Controllers
const TestController = require("./../apps/controllers/test");
const AdminController = require("./../apps/controllers/admin");
const AuthController = require("./../apps/controllers/auth");

const ProductController = require("./../apps/controllers/product");
const CategoryController = require("./../apps/controllers/category");
const UserController = require("./../apps/controllers/user");
const SiteController = require("./../apps/controllers/site");

// Import Middleware
const AuthMiddleware = require("./../apps/middlewares/auth");
const UploadMiddleware = require("./../apps/middlewares/upload");

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
  UploadMiddleware.array("thumbnail", 12),
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
  UploadMiddleware.array("thumbnail", 12),
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
router.post(
  "/admin/users/store",
  AuthMiddleware.checkAdmin,
  UserController.store
);
router.get(
  "/admin/users/edit/:id",
  AuthMiddleware.checkAdmin,
  UserController.edit
);
router.post(
  "/admin/users/update/:id",
  AuthMiddleware.checkAdmin,
  UserController.update
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
router.post(
  "/admin/categories/store",
  AuthMiddleware.checkAdmin,
  CategoryController.store
);
router.get(
  "/admin/categories/edit/:id",
  AuthMiddleware.checkAdmin,
  CategoryController.edit
);
router.post(
  "/admin/categories/update/:id",
  AuthMiddleware.checkAdmin,
  CategoryController.update
);
router.get(
  "/admin/categories/delete/:id",
  AuthMiddleware.checkAdmin,
  CategoryController.del
);

// Router Site
router.get("/", SiteController.home);
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.post("/product-:slug.:id", SiteController.comment);

router.get("/search", SiteController.search);

router.get("/cart", SiteController.cart);
router.post("/add-to-cart", SiteController.addToCart);
router.post("/update-cart", SiteController.updateCart);
router.get("/del-cart-:id", SiteController.delCart);

router.post("/order", SiteController.order);
router.get("/success", SiteController.success);
module.exports = router;
