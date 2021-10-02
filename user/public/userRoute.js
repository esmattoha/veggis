// import External Dependencies
const express = require("express");

// import internal modules
const { User } = require("../userModel");
const { catchAsync } = require("./../../utils/catchAsync");
const { AppError } = require("../../utils/appError");
const { isLoggedIn } = require("./../../middleware/isLoggedIn");
const {
  encryptPassword,
  isMatch,
  tokenImplement,
} = require("./userController");

const userRoute = express.Router();

/**
 * @req {*} name , email, password, phone
 * @return Message
 */
userRoute.post(
  "/user/register",
  catchAsync(async (req, res, next) => {
    const { name, email, password, confirmPassword, phone, type } = req.body;

    if (!name || !email || !password || !confirmPassword || !phone) {
      return next(new AppError(`Invalid Input Data.`, 406));
    }

    if(password !== confirmPassword){
        return next(new AppError(`Please match both password.`, 406));
    }

    const encryptedPassword = await encryptPassword(password);

    const userResource = await User.create({
      name,
      email,
      password: encryptedPassword,
      phone,
      type
    });

    if (!userResource) {
      return next(new AppError(`Resource have not created.Try again.`, 406));
    }
    next(new AppError(`Your account has created successfully.`, 201));
  })
);

/**
 * @req {*} email, passwod
 * @return jwtToken
 */
userRoute.post(
  "/user/login",
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError(`Invalid Input Data.`, 406));
    }
    //  Find user resource
    const userResource = await User.findOne({ email: email }).select(
      "password"
    );
    if (!userResource) {
      return next(new AppError(`Invalid Email or Password.`, 404));
    }
    // password Mathing
    const comparedPassword = await isMatch(password, userResource.password);

    if (!comparedPassword) {
      return next(new AppError(`Invalid Email or Password.`, 404));
    }
    // token implementation
    const jwtToken = await tokenImplement(userResource._id, email);
    if (!jwtToken) {
      return next(new AppError(`Login again , there are some issue.`, 417));
    }
    res.status(200).json(jwtToken);
  })
);

/**
 * @req {*} address Fields
 * @return result
 */
userRoute.post(
  "/user/add-new-address",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const  customer  = req.user._id;
    const { long, lat, addressLine1, addressLine2, city, state, zipcode } =
      req.body;

    if (!addressLine1 || !addressLine2 || !city || !state || !zipcode) {
      return next(new AppError(`Invalid Input Data.`, 406));
    }
    const newAddress = {
      $push: {
        address: {
          long,
          lat,
          addressLine1,
          addressLine2,
          city,
          state,
          zipcode,
        },
      },
    };
    const customerResource = await User.findById(customer);
    if (!customerResource) {
      return next(new AppError("Account Not found", 404));
    }
    if (customerResource.address.length >= 3) {
      return next(new AppError("You can add only 3 addresses.", 400));
    }

    await customerResource.update(newAddress);
    return next(new AppError("Address succesfully pushed.", 201));
  })
);

// export
module.exports = { userRoute };
