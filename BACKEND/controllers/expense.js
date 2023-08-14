const Expense = require("../models/expense");
const User = require("../models/user");
const DownloadURL = require("../models/downloadURL");
const s3UploadFile = require("../services/s3UploadFile");
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

exports.get = async (req, res) => {
  try {
    const { limit, skip } = req.params;
    const { user } = req;
    const dbRes = await Expense.findAndCountAll({
      where: { userEmail: user.email },
      limit: +limit,
      offset: +skip,
      order: [["createdAt", "DESC"]],
    });

    res.send({ expenses: dbRes.rows, totalCount: dbRes.count });
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

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

exports.download = async (req, res) => {
  try {
    const { user } = req;

    // If User Not Premium User
    if (!user.premium) {
      res.status(404).send("USER NOT PREMIUM");
      return;
    }

    // Getting All User Expenses
    const dbRes = await Expense.findAll({ where: { userEmail: user.email } });

    const jsonBody = JSON.stringify(dbRes);
    const fileName = `${user.email} ${Date.now()}.txt`;

    const downloadLink = await s3UploadFile(jsonBody, fileName);

    const downloadRes = await DownloadURL.create({
      url: downloadLink,
      userEmail: user.email,
    });

    res.send(downloadRes);
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
};
