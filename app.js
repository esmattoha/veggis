// import external Dependecies
const express = require("express");
const mongoose = require("mongoose");

//import internal Dependencies
const userRoute = require("./user/public/userRoute");
const { adminRoute } = require("./user/private/userRoute");
const { productRoute } = require("./product/productRoute");
const { orderRouter } = require("./order/orderRoute");
const { globalErrorHandler } = require("./errors/errorHandler");
const { AppError } = require("./utils/appError");

const app = express();

// DataBase Connection
(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Veggis:veggis@cluster0.2mnel.mongodb.net/Veggis",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("You are Successfully connected with Database.");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

// JSON Parser
app.use(express.json());

// routes
app.use("/veggis/api/", userRoute);
app.use("/veggis/api", adminRoute);
app.use("/veggis/api/", productRoute);
app.use("/veggis/api/", orderRouter);

// 404 Error Handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling
app.use(globalErrorHandler);

// app Export
module.exports = { app };
