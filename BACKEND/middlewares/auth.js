const User = require("../models/user");
const { verifyJwt } = require("../services/jwt");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;

    // Extract Email & Password
    const { email, password } = verifyJwt(idToken);

    // Getting User
    const dbRes = await User.findOne({ where: { email } });

    // If Hash Not Matched
    if (!dbRes) {
      res.status(404).send("USER NOT FOUND");
      return;
    }

    // Checking Hash
    const diffHash = bcrypt.compareSync(password, dbRes.dataValues.password);

    // If Hash Not Matched
    if (!diffHash) {
      res.status(404).send("ACCESS DENIED LOGIN AGAIN");
      return;
    }

    // Storing User In Req and Passing To Next Middleware
    req.user = dbRes.dataValues;

    next();
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
    return;
  }
};
