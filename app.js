// import external Dependecies
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

//import internal Dependencies 
const { userRoute } = require("./user/public/userRoute");
const { oAuthRoute } = require("./OAuth/google/googleAuthRoute");
const { githubAuthRoute } = require("./OAuth/github/githubAuthRoute");
const { adminRoute } = require("./user/private/userRoute")
const { productRoute } = require('./product/productRoute');
const { orderRouter } = require("./order/orderRoute");
const { paymentRoute } = require("./payment/paymentRoute");
const {globalErrorHandler}  = require("./errors/errorHandler");
const {AppError} = require("./utils/appError");


const app = express();


const corsOptions = {
    Credential: true,
    origin:['http://localhost:3000', 'http://localhost:8080',]
}

app.use(cors(corsOptions));

// DataBase Connection
(async () => {
    try{
       await mongoose.connect("mongodb+srv://Veggis:veggis@cluster0.2mnel.mongodb.net/Veggis",
       {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
       console.log("You are Successfully connected with Database.")
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
    
})();

// JSON Parser
app.use(express.json());

// routes
app.use("/veggis/api/",userRoute);
app.use(oAuthRoute);
app.use(githubAuthRoute);
app.use("/veggis/api", adminRoute);
app.use("/veggis/api/", productRoute);
app.use("/veggis/api/", orderRouter);
app.use("/veggis/api/payment/", paymentRoute);



// 404 Error Handling 
app.all("*" , (req, res, next ) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling
app.use(globalErrorHandler);

// app Export
module.exports = { app };