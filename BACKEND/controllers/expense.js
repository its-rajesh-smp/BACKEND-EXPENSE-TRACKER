const { where } = require("sequelize");
const Expense = require("../models/expense");
const User = require("../models/user");

exports.create = async (req, res) => {
  try {
    const { name, price, category, userEmail, updatedTotalExpense } = req.body;

    const dbRes = await Expense.create({ name, price, category, userEmail });

    await User.update(
      { totalExpense: updatedTotalExpense },
      { where: { email: userEmail } }
    );

    res.send(dbRes);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

exports.get = async (req, res) => {};

exports.delete = async (req, res) => {
  try {
    const { id, updatedTotalExpense, userEmail } = req.body;

    await Expense.destroy({ where: { id: id } });
    await User.update(
      { totalExpense: updatedTotalExpense },
      { where: { email: userEmail } }
    );

    res.send({ id });
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};
