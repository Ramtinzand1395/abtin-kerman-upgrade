const mongoose = require("mongoose");
const moment = require("moment-jalaali");
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  additionalExplanations: {
    type: String,
  },
  Specifications: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  features: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  description: {
    type: String,
  },
  primaryImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  additionalImages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  sellOne: {
    type: Boolean,
    default: false,
  },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  createdAt: {
    type: String, 
    default: () => moment().format('jYYYY/jM/jD HH:mm:ss'), 
  },
  menuLink:{
    type: String,
    enum: ["products", "games"],
    required: true,
  },
  slug1:{
    type: String,
    required: true,
  },
  slug2:{
    type: String,
    required: true,
  }
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
