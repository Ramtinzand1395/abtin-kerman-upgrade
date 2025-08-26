const mongoose = require("mongoose");
const moment = require("moment-jalaali");

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  relatedModel: {
    type: String,
    enum: ["Product", "accountgame"], // Indicate the type of related document
    required: true,
  },
  rating: { type: Number, min: 1, max: 5 },
  isValidated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: () => moment().format("jYYYY/jM/jD HH:mm:ss"),
  },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
