// import external dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Order Schema
const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    products: [
      {
        _id : {
          type: mongoose.Types.ObjectId
        },
        title:{
          type: String
        },
        quantity : {
          type : Number
        },
        price :{
          type : Number
        }
      },
    ],
    status : {
        type : String,
        default : "hold",
        enum: ["hold", "comfirmed", "canceled", "complete"]
    },
    total_price : Number,
    user_note: String,
  },
  {
    toJSON : true,
    toObject: true,
    timestamps: true,
  }
);

// Virtual populate
orderSchema.virtual("uder",{
    ref: "User",
    localField :  "user",
    foreignField : "_id"
});

// export
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
