const mongoose = require("mongoose");
const moment = require("moment-jalaali");


const ImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
  },
  direction: {
    type: String,
  },
  createdAt: {
    type: String, 
    default: () => moment().format('jYYYY/jM/jD HH:mm:ss'), 
  },
});


module.exports = mongoose.models.Image || mongoose.model("Image", ImageSchema);
