const router = require("express").Router();
const forgotpasswordController = require("../controllers/forgotPassword");

router.get(
  "/password/forgotpassword/:id",
  forgotpasswordController.forgotpassword
);
router.post(
  "/password/sendForgotPasswordEmail",
  forgotpasswordController.sendForgotPasswordEmail
);
router.post(
  "/password/changePassword/:id",
  forgotpasswordController.changePassword
);

module.exports = router;
