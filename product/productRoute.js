// import External Dependencies
const express = require("express");

// import internal modules
const { Product } = require("./productModel");
const { isLoggedIn } = require("./../middleware/isLoggedIn");
const { checkAdmin } = require("./../middleware/checkAdmin");
const { catchAsync } = require("./../utils/catchAsync");
const { AppError } = require("./../utils/appError");

const productRoute = express.Router();

/**
 * @param {*} title
 * @param {*} price
 * @returns Created Product
 */
productRoute.post(
  "/product",
  isLoggedIn,
  checkAdmin,
  catchAsync(async (req, res, next) => {
    const { title,parent , price } = req.body;

    if (!title) {
      return next(new AppError("Invalid Input Data.", 406));
    }

    const productResource = new Product({
      title,
      parent : parent ? parent : null,
      price : price ? price : 0,
    });

    const createdResource = await productResource.save();
    if (!createdResource) {
      return next(new AppError("Resource have not created.Try again.", 406));
    }
    return res.status(201).json({
      data: createdResource,
    });
  })
);

/**
 *  @param {*}
 * @returns All Products
 */
productRoute.get(
  "/products",
  catchAsync(async (req, res, next) => {
    // Find Products Resource
    const productsResource = await Product.find().populate({ path : 'children'});

    if (productsResource.length <= 0) {
      return next(new AppError("Products not Available.", 404));
    }

    res.status(200).json({
      Product: productsResource,
    });
  })
);

/**
 *  @param {*} ProductId
 *  @returns Product
 */
productRoute.get(
  "/product",
  catchAsync(async (req, res, next) => {
    const { product } = req.body;

    if (!product) {
      return next(new AppError("Invalid Input Data.", 406));
    }

    // Find Product Resource
    const productResource = await Product.findById(product);

    if (!productResource) {
      return next(new AppError("Product Not Found", 404));
    }

    res.status(200).json({ Product: productResource });
  })
);

/**
 *  @param {*} ProductId
 *  @returns Message
 */
productRoute.patch(
  "/product",
  isLoggedIn,
  checkAdmin,
  catchAsync(async (req, res, next) => {
    const { product, price } = req.body;

    if (!product || !price) {
      return next(new AppError("Invalid Input Data.", 406));
    }

    // Updatation
    const updatedProduct = await Product.findByIdAndUpdate(product, {
      $set: { price: price },
    });

    if (!updatedProduct) {
      return next(new AppError("Product Not Found", 404));
    }

    // Success Responce
    res.status(200).json("Update Successfull.");
  })
);

/**
 *  @param {*} ProductId
 *  @returns Message
 */
productRoute.delete(
  "/product",
  isLoggedIn,
  checkAdmin,
  catchAsync(async (req, res, next) => {
    const { product } = req.body;

    if (!product) {
      return next(new AppError("Invalid Input Data.", 406));
    }

    // Deletion
    const deletedProduct = await Product.findByIdAndDelete(product);

    if (!deletedProduct) {
      return next(new AppError("Product Not Found.", 404));
    }

    // Success Responce
    res.status(200).json("Delete Successfull.");
  })
);

// export
module.exports = { productRoute };
