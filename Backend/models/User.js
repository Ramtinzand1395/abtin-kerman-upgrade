const mongoose = require("mongoose");
const moment = require("moment-jalaali");
const addressSchema = new mongoose.Schema({
  city: { type: String },
  provider: { type: String },
  address: { type: String },
  plaque: { type: String }, // Changed to String for flexibility
  unit: { type: String }, // Changed to String for flexibility
  postalCode: { type: String },
});
const favoritesSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "itemType",
    // ref:"Product"
  },
  itemType: { type: String, enum: ["Product", "Games"] },
});
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favorites: [favoritesSchema],
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  address: { type: addressSchema },
  firstName: {
    type: String,
    trim: true,
    maxlength: [225, "نام و نام خانوادگی نباید بیشتر از 225 کاراکتر باشد"],
    minlength: [3, "نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد"],
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [225, "نام و نام خانوادگی نباید بیشتر از 225 کاراکتر باشد"],
    minlength: [3, "نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد"],
  },
  phone: {
    type: Number,
  },
  role: {
    type: String,
    require: true,
    enum: ["user", "admin", "superAdmin"],
    default: "user",
  },
  profile: {
    type: String,
  },
  createdAt: {
    type: String,
    default: () => moment().format("jYYYY/jM/jD HH:mm:ss"),
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
