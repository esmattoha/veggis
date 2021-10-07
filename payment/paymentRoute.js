// Import Dependencies
const express = require("express");
const { Payment } = require("./paymentModel");
const { Order } = require("./../order/orderModel");
const { isLoggedIn } = require("./../middleware/isLoggedIn");
const { makePaymentIntent } = require("./paymentController");
const { AppError } = require("./../utils/appError");
const { catchAsync } = require("./../utils/catchAsync");

const paymentRoute = express.Router();

/**
 *
 */
paymentRoute.post(
  "/get-intent",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const user = req.user;
    const { orderId, amount, cardDetails } = req.body;

    if (!orderId && !amount && !cardDetails) {
      return next(new AppError("Invalid Input Data", 406));
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new AppError("Invalid Input Data", 406));
    }

    const paymentIntent = await makePaymentIntent(
      order,
      user,
      amount,
      cardDetails
    );

    if (!paymentIntent) {
      return next(new AppError("Something went wrong", 400));
    }

    res.status(201).json({
      id: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
    });
  })
);

/**
 * 
 */
// paymentRouter.post("/", isLoggedIn, catchAsync(async(req, res, next)=>{
//     const { paymentIntent } = req.body;

//     if (!paymentIntent) {
//         return next(new AppError("Invalid Input Data", 406));
//       }

//       const 
// }))


// export
module.exports = { paymentRoute };
