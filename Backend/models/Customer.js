const mongoose = require("mongoose");
const moment = require("moment-jalaali");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "کاربر بی نام",
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: ["مرد", "زن"],
      required: true,
    },
    birthday: { type: String },
    description: { type: String },
    persianDate: { type: String },
  },
  {
    timestamps: true,
  }
);
customerSchema.pre("save", function (next) {
  const m = moment(); // تاریخ فعلی
  this.persianDate = m.format("jYYYY/jMM/jDD HH:mm");
  next();
});
module.exports =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);
