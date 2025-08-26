const mongoose = require("mongoose");

const gameListSchema = new mongoose.Schema({
  items: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  platform: {
    type: String,
  },
});

module.exports =
  mongoose.models.GameList || mongoose.model("GameList", gameListSchema);
