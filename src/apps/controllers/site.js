const moment = require("moment");
const path = require("path");
const ejs = require("ejs");
const transporter = require("../../common/transporter");

const CategoryModel = require("../models/category");
const CommentModel = require("../models/comment");
const ProductModel = require("../models/product");

const home = async (req, res) => {
  const featuredProducts = await ProductModel.find({
    is_stock: true,
    featured: true,
  })
    .sort({ _id: -1 })
    .limit(6);
  const latestProducts = await ProductModel.find({ is_stock: true })
    .sort({ _id: -1 })
    .limit(6);
  res.render("site/index", { featuredProducts, latestProducts });
};
const category = async (req, res) => {
  const { id } = req.params;
  const products = await ProductModel.find({ cat_id: id }).sort({ _id: -1 });
  const title = (await CategoryModel.find({ _id: id }))[0].title;
  const total = products.length;
  res.render("site/category", { products, title, total });
};
const product = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  const comments = await CommentModel.find({ prd_id: id }).sort({ _id: -1 });
  res.render("site/product", { product, comments, moment });
};
const comment = async (req, res) => {
  const { id } = req.params;
  const { email, full_name, body } = req.body;
  // console.log(email, full_name, body);
  const comment = {
    prd_id: id,
    full_name,
    email,
    body,
  };
  await new CommentModel(comment).save();
  res.redirect(req.path);
};
const search = async (req, res) => {
  const keyword = req.query.keyword || "";
  const filter = {};
  if (keyword) {
    filter.$text = {
      $search: keyword,
    };
  }
  const products = await ProductModel.find(filter);
  res.render("site/search", { products, keyword });
};
const cart = (req, res) => {
  const cart = req.session.cart;
  res.render("site/cart", { cart });
};
const addToCart = async (req, res) => {
  const { id, qty } = req.body;
  let cart = req.session.cart;
  let isProductExists = false;
  cart.map((item) => {
    if (item.id === id) {
      item.qty += parseInt(qty);
      isProductExists = true;
    }
    return item;
  });
  if (!isProductExists) {
    const product = await ProductModel.findById(id);
    cart.push({
      id,
      qty: parseInt(qty),
      name: product.name,
      price: product.price,
      img: product.thumbnail,
    });
  }
  req.session.cart = cart;
  res.redirect("/cart");
};
const updateCart = (req, res) => {
  const { products } = req.body;
  let cart = req.session.cart;
  // console.log(products);
  cart.map((item) => {
    return (item.qty = parseInt(products[item.id]["qty"]));
  });
  req.session.cart = cart;
  res.redirect("/cart");
};
const delCart = (req, res) => {
  const { id } = req.params;
  let cart = req.session.cart;
  const newCart = cart.filter((item) => {
    return item.id != id;
  });
  req.session.cart = newCart;
  res.redirect("/cart");
};
const order = async (req, res) => {
  const { name, phone, mail, add } = req.body;
  const items = req.session.cart;
  // console.log(body);
  // console.log(items);
  const html = await ejs.renderFile(
    path.join(req.app.get("views"), "site/order-mail.ejs"),
    {
      name,
      phone,
      mail,
      add,
      items,
    }
  );
  await transporter.sendMail({
    to: mail,
    from: "Vietpro Shop",
    subject: "Xác nhận đơn hàng từ VietPro Shop",
    html,
  });
  req.session.cart = [];
  res.redirect("/success");
};
const success = (req, res) => {
  res.render("site/success");
};

module.exports = {
  home,
  category,
  product,
  comment,
  search,
  cart,
  addToCart,
  updateCart,
  delCart,
  order,
  success,
};
