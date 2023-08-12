const Payment = require("../models/payment");
const User = require("../models/user");
const Razorpay = require("razorpay");
const bcrypt = require("bcrypt");

const { verifyJwt } = require("../services/jwt");

exports.createOrder = async (req, res) => {
  try {
    // Getting IdToken
    const { idToken } = req.body;

    // Getting Email & Password
    const { email, password } = verifyJwt(idToken);

    // Finding User
    const dbRes = await User.findOne({
      where: { email: email },
    });

    // If User not present
    if (!dbRes) {
      res.status(404).send("No User Found");
      return;
    }

    // Checking Hash
    const checkHash = bcrypt.compareSync(password, dbRes.password);

    // If Hash Not Matched
    if (!checkHash) {
      res.status(404).send("Password Not Matched");
      return;
    }

    // Creating Razorpay Instance
    var rzp = new Razorpay({
      key_id: process.env.RZP_KEY_ID,
      key_secret: process.env.RZP_KEY_SECRET,
    });

    // Creating Razorpay Order
    const { id: orderId } = await rzp.orders.create({
      amount: +process.env.RZP_AMOUNT,
      currency: process.env.RZP_CURRENCY,
    });

    // Storing The Payment
    await Payment.create({ orderId, userEmail: email });

    // Sending The OrderId To Frontend
    res.send({ orderId, userEmail: email });
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const { userEmail, orderId, paymentId } = req.body;

    await Payment.update(
      { paymentId: paymentId, paymentStatus: "PAID" },
      { where: { orderId } }
    );

    await User.update({ premium: true }, { where: { email: userEmail } });

    res.send({ premium: true });
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

exports.paymentFailed = async (req, res) => {
  try {
    const { orderId } = req.body;

    await Payment.update({ paymentStatus: "FAIL" }, { where: { orderId } });

    res.send(false);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};
