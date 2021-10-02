// import external dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

// User Schema
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required."],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    price: {
      type: Number,
      default: 0,
    },
    cover: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Virtual Populate
productSchema.virtual("children", {
  ref: "Product",
  localField: "_id",
  foreignField: "parent",
});


// export
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
