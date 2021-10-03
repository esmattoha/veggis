// import external dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Order Schema
const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: Number,
      },
    ],
    user_note: String,
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// export
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
