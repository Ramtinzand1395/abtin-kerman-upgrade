const mongoose = require("mongoose");
const moment = require("moment-jalaali");
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
  },

  createdAt: {
    type: String, 
    default: () => moment().format('jYYYY/jM/jD'), 
  },
});

module.exports =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
