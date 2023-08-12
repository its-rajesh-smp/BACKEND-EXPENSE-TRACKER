const { STRING } = require("sequelize");
const sequelize = require("../utils/db");

const Payment = sequelize.define("payment", {
  orderId: {
    allowNull: false,
    primaryKey: true,
    type: STRING,
  },
  paymentStatus: {
    type: STRING,
    defaultValue: "PENDING",
  },
  paymentId: {
    type: STRING,
  },
});

module.exports = Payment;
