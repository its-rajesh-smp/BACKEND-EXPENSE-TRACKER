const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createJwt, verifyJwt } = require("../services/jwt");
const Expense = require("../models/expense");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password, +process.env.SALT);

    const dbRes = await User.create({ name, email, password: hash });

    const idToken = createJwt({ email, password });

    delete dbRes.dataValues.password;

    res.send({ ...dbRes.dataValues, idToken });
  } catch (error) {
    res.status(404).send("Already User Present");
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dbRes = await User.findOne({
      where: { email: email },
      include: [Expense],
    });

    if (!dbRes) {
      res.status(404).send("No User Found");
      return;
    }
    const checkHash = bcrypt.compareSync(password, dbRes.password);

    if (!checkHash) {
      res.status(404).send("Password Not Matched");
      return;
    }

    const idToken = createJwt({ email, password });
    delete dbRes.dataValues.password;

    res.send({ ...dbRes.dataValues, idToken });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.get = async (req, res) => {
  try {
    const { idToken } = req.body;

    const { email, password } = verifyJwt(idToken);

    const dbRes = await User.findOne({
      where: { email: email },
      include: [Expense],
    });

    if (!dbRes) {
      res.status(404).send("No User Found");
      return;
    }

    const checkHash = bcrypt.compareSync(password, dbRes.password);

    if (!checkHash) {
      res.status(404).send("Password Not Matched");
      return;
    }

    delete dbRes.dataValues.password;

    res.send({ ...dbRes.dataValues, idToken });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.update = async (req, res) => {};

exports.getLeaderboard = async (req, res) => {
  try {
    const dbRes = await User.findAll({
      attributes: ["name", "email", "totalExpense"],
      order: [["totalExpense", "DESC"]],
    });

    res.send(dbRes);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
