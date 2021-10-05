// import external dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

// User Schema
const paymentSchema = new Schema(
  {
    order: {
      type: mongoose.Types.ObjectId,
      required: [true, "order id is required."],
      ref: "Order",
    },
    customer: {
      type: mongoose.Types.ObjectId,
      required: [true, "user id is required."],
      ref: "User",
    },
    amount: {
      type: Number,
      required: [true, "amount is required."],
    },
    status: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    gatewayCustomerId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// export
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = { Payment };
