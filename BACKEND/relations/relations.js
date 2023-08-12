const User = require("../models/user");
const Expense = require("../models/expense");
const Payment = require("../models/payment");
const Password = require("../models/forgotPassword");
module.exports = () => {
  User.hasMany(Expense);
  Expense.belongsTo(User);

  User.hasMany(Payment);
  Payment.belongsTo(User);

  User.hasMany(Password);
  Password.belongsTo(User);
};
