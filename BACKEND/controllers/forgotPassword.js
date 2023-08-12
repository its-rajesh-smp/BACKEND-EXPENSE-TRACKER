const Sib = require("sib-api-v3-sdk");
const uuid = require("uuid");
const Forgotpassword = require("../models/forgotPassword");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.sendForgotPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const id = uuid.v4();

    await Forgotpassword.create({ id, userEmail: email });

    const client = Sib.ApiClient.instance;
    var apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.EMAIL_API;
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = { email: process.env.SENDER_EMAIL };
    const recivers = [{ email: email }];

    const emailRes = await tranEmailApi.sendTransacEmail({
      sender,
      to: recivers,
      subject: "EXPENSE TRACKER FORGOT PASSWORD",
      textContent: `Forgot Password Link is==> http://localhost:5000/password/forgotpassword/${id}`,
    });

    res.send(email);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

exports.forgotpassword = async (req, res) => {
  try {
    const { id } = req.params;

    const dbRes = await Forgotpassword.findOne({ where: { id: id } });

    if (!dbRes || !dbRes.dataValues.isActive) {
      res.status(404).send("LINK IS EXPIRED");
      return;
    }

    await Forgotpassword.update({ isActive: false }, { where: { id: id } });

    res.send(
      `<body><form method="POST" action="http://localhost:5000/password/changePassword/${id}"> <input type="text" name="password" placeholder="Enter Password" /> <button>Change Password</button> </form></body>`
    );
  } catch (error) {
    res.status(404).send(false);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const passRes = await Forgotpassword.findOne({ where: { id: id } });

    if (!passRes) {
      res.status(404).send("SOMETHING WENT WRONG");
      return;
    }

    const hash = bcrypt.hashSync(password, +process.env.SALT);

    const dbRes = await User.update(
      { password: hash },
      { where: { email: passRes.dataValues.userEmail } }
    );

    res.send(true);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
