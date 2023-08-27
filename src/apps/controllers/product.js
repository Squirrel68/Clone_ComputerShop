const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const fs = require("fs");
const path = require("path");
const slug = require("slug");
const paginate = require("../../common/paginate");

const index = async (req, res) => {
  const limit = 10;
  const page = parseInt(req.query.page) || 1;
  const skip = page * limit - limit;
  const products = await ProductModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .populate({ path: "cat_id" });
  const totalRow = await ProductModel.find().countDocuments();
  const totalPage = Math.ceil(totalRow / limit);
  res.render("admin/products/product", {
    products,
    page,
    pages: paginate(page, totalPage),
    totalPage,
  });
};
const create = async (req, res) => {
  const categories = await CategoryModel.find();
  res.render("admin/products/add_product", { categories });
};
const store = (req, res) => {
  const { file, body } = req;
  const product = {
    // thumbnail:,
    name: body.name,
    price: body.price,
    warranty: body.warranty,
    accessories: body.accessories,
    promotion: body.promotion,
    status: body.status,
    cat_id: body.cat_id,
    is_stock: body.is_stock,
    description: body.description,
    featured: body.featured == "yes",
    slug: slug(body.name),
  };
  if (file) {
    const thumbnail = "products/" + file.originalname;
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
    product["thumbnail"] = thumbnail;
    new ProductModel(product).save();
    res.redirect("/admin/products");
  } else {
    res.send("error upload file");
  }
};
const edit = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  const categories = await CategoryModel.find();
  res.render("admin/products/edit_product", { product, categories });
};
const update = async (req, res) => {
  const { id } = req.params;
  const { file, body } = req;
  const product = {
    name: body.name,
    price: body.price,
    warranty: body.warranty,
    accessories: body.accessories,
    promotion: body.promotion,
    status: body.status,
    cat_id: body.cat_id,
    is_stock: body.is_stock,
    description: body.description,
    featured: body.featured == "yes",
    slug: slug(body.name),
  };
  if (file) {
    const thumbnail = "products/" + file.originalname;
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
    product["thumbnail"] = thumbnail;
  }
  await ProductModel.updateOne({ _id: id }, { $set: product });
  res.redirect("/admin/products");
};
const del = async (req, res) => {
  const id = req.params.id;
  await ProductModel.deleteOne({ _id: id });
  res.redirect("/admin/products");
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  del,
};
