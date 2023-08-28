const CategoryModel = require("../models/category");
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
  res.render("site/product", { product });
};
const search = (req, res) => {
  res.render("site/search");
};
const cart = (req, res) => {
  res.render("site/cart");
};
const success = (req, res) => {
  res.render("site/success");
};

module.exports = {
  home,
  category,
  product,
  search,
  cart,
  success,
};
