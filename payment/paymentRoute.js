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
paymentRouter.post("/", isLoggedIn, catchAsync(async(req, res, next)=>{
  const { paymentIntent } = req.body;
  if (!paymentIntent) {
    return new AppError(`Invalid data input`, 406);
  }

  const intentData = await stripe.paymentIntents.retrieve(paymentIntent);
  const orderNumber = intentData.metadata.orderNumber;

  const order = await Order.findOne(orderNumber);

  const createdPayment = await Payment.create({
    order: order._id,
    customer: order.customer,
    status: intentData.status,
    amount: intentData.amount / 100,
    transactionId: intentData.id,
  });

  res.status(201).json({
    status: "success",
    data: createdPayment,
  });
}))


// export
module.exports = { paymentRoute };
