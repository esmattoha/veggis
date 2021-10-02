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
    return item.price;
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
    return await Product.findById(item).select("_id title price");
  });

  const productItemsData = await Promise.all(productItems);

  return Promise.resolve(productItemsData);
};

// export
module.exports = { totalAmount, productResources };
