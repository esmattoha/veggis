 // Import Dependencies
const express = require("express");

const { Order } = require("./orderModel");
const { totalAmount, productResources } = require("./orderController");
const { catchAsync } = require("./../utils/catchAsync");
const { AppError } = require("./../utils/appError");
const { isLoggedIn } = require("./../middleware/isLoggedIn");
const { checkAdmin } = require("../middleware/checkAdmin");

const orderRouter = express.Router();

/**
 *
 */
orderRouter.post("/order", isLoggedIn, catchAsync(async(req, res, next) =>{
  const { products, user_note } = req.body;
  const user = req.user;

  
  if((products.length <= 0) && !user){
    return next(new AppError("Invalid Input Data .", 406));
  }

  const productData = await productResources(products);
  const totalPrice = await totalAmount(productData);

  const order = await Order.create({
    user : user._id,
    products : productData,
    user_note,
    totalPrice : totalPrice
  })

  res.json(order);
}))

// export
module.exports = { orderRouter };
