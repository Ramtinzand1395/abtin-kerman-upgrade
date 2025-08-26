const mongoose = require("mongoose");
const moment = require("moment-jalaali");
const TagSchema = new mongoose.Schema({
  tagName: {
    type: String,
  },
  createdAt: {
    type: String, 
    default: () => moment().format('jYYYY/jM/jD HH:mm:ss'), 
  },
});

module.exports = mongoose.models.Tag || mongoose.model("Tag", TagSchema);
