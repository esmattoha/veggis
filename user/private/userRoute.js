// import External Dependencies
const express = require("express");

// import internal modules
const { User } = require("../userModel");
const { catchAsync } = require("./../../utils/catchAsync");
const { AppError } = require("../../utils/appError");
const { isLoggedIn } = require("./../../middleware/isLoggedIn");
const { checkAdmin } = require("./../../middleware/checkAdmin");

const adminRoute = express.Router();

/**
 *
 */
adminRoute.get(
  "/users",
  isLoggedIn,
  checkAdmin,
  catchAsync(async (req, res, next) => {
    const usersResource = await User.find();

    if (usersResource.length <= 0) {
      return next(new AppError("No User found.", 404));
    }
    res.status(200).json({ User: usersResource });
  })
);

/**
 *
 */
adminRoute.patch(
  "/user/:id",
  isLoggedIn,
  checkAdmin,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const userResource = await User.findByIdAndUpdate(id, {
      $set: { isBlocked: true },
    });

    if (!userResource) {
      return next(new AppError("User not found.", 404));
    }

    res.status(200).json("Request Complete.");
  })
);

/**
 *
 */
adminRoute.delete(
  "/user/:id",
  isLoggedIn,
  checkAdmin,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const userResource = await User.findByIdAndDelete(id);

    if (!userResource) {
      return next(new AppError("User not found.", 404));
    }

    res.status(200).json("Request Complete.");
  })
);

//export
module.exports = { adminRoute };
