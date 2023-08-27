const mongoose = require("../../common/database")();
const productSchema = mongoose.Schema(
  {
    thumbnail: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: 0,
    },
    cat_id: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: String,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    promotion: {
      type: String,
      default: null,
    },
    warranty: {
      type: String,
      default: null,
    },
    accessories: {
      type: String,
      default: null,
    },
    is_stock: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
      text: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const ProductModel = mongoose.model("Product", productSchema, "products");
module.exports = ProductModel;
