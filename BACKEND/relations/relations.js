const User = require("../models/user");
const Expense = require("../models/expense");
const Payment = require("../models/payment");
module.exports = () => {
  User.hasMany(Expense);
  Expense.belongsTo(User);

  User.hasMany(Payment);
  Payment.belongsTo(User);
};
