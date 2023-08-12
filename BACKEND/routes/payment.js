const router = require("express").Router();
const paymentController = require("../controllers/payment");

router.post("/payment/createOrder", paymentController.createOrder);
router.post("/payment/paymentSuccess", paymentController.paymentSuccess);
router.post("/payment/paymentFailed", paymentController.paymentFailed);

module.exports = router;
