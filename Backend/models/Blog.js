const mongoose = require("mongoose");
const moment = require("moment-jalaali");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true }, // CKEditor content
  primaryImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },
  createdAt: {
    type: String, 
    default: () => moment().format('jYYYY/jM/jD HH:mm:ss'), 
  },
});
module.exports = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
