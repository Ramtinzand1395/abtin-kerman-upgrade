const mongoose = require("mongoose");
const moment = require("moment-jalaali");

const infoSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  capacity: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
});

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  primaryImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },
  additionalImages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  info: { type: [infoSchema], required: true },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  sellOne: {
    type: Boolean,
    default: true,
  },
  comments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  additionalExplanations: {
    type: String,
  },
  features: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  createdAt: {
    type: String, 
    default: () => moment().format('jYYYY/jM/jD HH:mm:ss'), 
  },
});
module.exports = mongoose.models.Games || mongoose.model("Games", gameSchema);
