// import external dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is Required."],
    min: [4, "Must be 4 charater."],
    max: [12, "You exceed charater limit."],
  },
  email: {
    type: String,
    required: [true, "Email is Required."],
  },
  password: {
    type: String,
    required: [true, "Password is Required."],
    min: [4, "Must be 4 charater."],
    max: [12, "You exceed charater limit."],
  },
  phone: {
    type: String,
    required: [true, "Phone No is Required."],
  },
  oAuth:{
    google_id: String,
    github_id: String
  },
  type:{
    type: String,
    default : "customer",
    enum: ["customer", "admin"]
  },
  address: [
    {
      long: Number,
      lat: Number,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      zipcode: Number,
    },
  ],
  isBlocked: {
    type: String,
    default: null,
    enum: [null, true],
  },
  stripeId : {
    type : String
  }
},{
  timestamps: true
});

// export
const User = mongoose.model("User", userSchema);
module.exports = { User };
