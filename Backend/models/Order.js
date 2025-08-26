const mongoose = require("mongoose");
const moment = require("moment-jalaali");

const SelectedPlatformSchema = new mongoose.Schema({
  platform: { type: String, default: null }, // Use String instead of string
  capacity: { type: String, default: null },
  price: { type: Number, default: null }, // Default to null
});
const PaymentSchema = new mongoose.Schema({
  status: { type: Number, required: true, default: 0 }, // e.g., 100 for success
  message: { type: String, required: true, default: "NOK" }, // e.g., 'Paid'
  cardHash: { type: String, default: "NOK" }, // Optional card hash
  cardPan: { type: String, default: "NOK" }, // Optional card PAN
  refId: { type: Number, required: true , default:0}, // Unique reference ID
  feeType: { type: String, default: "NOK" }, // Optional fee type
  fee: { type: Number, default: 0 }, // Optional fee amount
  ammount: { type: Number, require: true }, // Optional fee amount
});
const ItemSchema = new mongoose.Schema({
  id: {
    // Reference to the product or game ID
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ItemQty: {
    type: Number,
    required: true, // Assuming quantity is required
  },
  SelectedPlatform: SelectedPlatformSchema, // Use the defined schema for platform details
  itemType: {
    // Add a field to indicate the type of item
    type: String,
    enum: ["Products", "Games"], // Limit to specific types
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [ItemSchema], // Using the ItemSchema defined above
  TrackingCode: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["در انتظار تایید", "در حال بسته بندی", "تحویل داده شده"],
    required: true,
    default: "در انتظار تایید",
  },
  payment: {
    type: PaymentSchema, // Embed the payment schema here
    required: false, // Payment details might not exist for unpaid orders
  },
  createdAt: {
    type: Date,
    default: () => moment().format("jYYYY/jM/jD HH:mm:ss"),
  },
});

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
