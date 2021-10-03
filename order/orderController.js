// Import Dependencies
const { Product } = require("./../product/productModel");
/**
 *
 * @param {*} products
 * @returns  products total prices
 */
const totalAmount = async (products) => {
  const reducer = (accumulator, current) => accumulator + current;

  const itemprices = products.map(async (item) => {
    return item.price * item.quantity;
  });

  const productItemsPrices = await Promise.all(itemprices);
  return productItemsPrices.reduce(reducer);
};

/**
 *
 * @param {*} products
 * @returns array of products
 */
const productResources = async (products) => {
  const productItems = await products.map(async (item) => {
    const productResource = await Product.findById(item._id).select(
      "_id title price"
    );
    const productQuantity = item.quantity;

    return {
      _id: productResource._id,
      title: productResource.title,
      price: productResource.price,
      quantity: productQuantity,
    };
  });

  const productItemsData = await Promise.all(productItems);

  return Promise.resolve(productItemsData);
};

// export
module.exports = { totalAmount, productResources };
