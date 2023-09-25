const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

exports.makePayment = async (req, res) => {
  const { amount, id } = req.body;

  const dividedAmount = amount / 2;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: dividedAmount,
      currency: "USD",
      description: "Learnova online courses",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3000",
    });

    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};

exports.makeSubscriptionPayment = async (req, res) => {
  const { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Learnova online courses",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3000",
    });

    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};
