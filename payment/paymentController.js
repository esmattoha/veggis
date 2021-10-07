// Import Dependencies
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51HWarCBCiywqtJLTLb0IA9JSqBjVuvYbRHrecz3RxgetmyWLNIQZA9zTHLWzZ2cJ9zY769qYR93Gdyc5X8lNYHvC00Q1vyRRSh");

const makePaymentIntent = async (
  orderDetails,
  customer,
  amount,
  cardDetails
) => {

  const intentObj = {
    amount: parseInt(amount * 100),
    currency: "usd",
    metadata: {
      orderNumber: orderDetails.orderNumber,
    },
    receipt_email: customer.email,
    type: "card",
    card: {
      number: cardDetails.number,
      exp_month: cardDetails.exp_month,
      exp_year: cardDetails.exp_year,
      cvc: cardDetails.cvc,
    },
  };

  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create(intentObj);
  } catch (err) {
    console.log(err);
  }

  return Promise.resolve(paymentIntent);
};

//export
module.exports = { makePaymentIntent };
