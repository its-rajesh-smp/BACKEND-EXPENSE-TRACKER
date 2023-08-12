const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../utils/db");

exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { name, price, category, userEmail, updatedTotalExpense } = req.body;

    const dbRes = await Expense.create(
      { name, price, category, userEmail },
      { transaction: t }
    );

    await User.update(
      { totalExpense: updatedTotalExpense },
      { where: { email: userEmail }, transaction: t }
    );

    await t.commit();

    res.send(dbRes);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error.message);
  }
};

exports.get = async (req, res) => {};

exports.delete = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id, updatedTotalExpense, userEmail } = req.body;

    await Expense.destroy({ where: { id: id }, transaction: t });
    await User.update(
      { totalExpense: updatedTotalExpense },
      { where: { email: userEmail }, transaction: t }
    );

    await t.commit();
    res.send({ id });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error.message);
  }
};
