const User = require("../models/user");

module.exports = (req, res, next) => {
  try {
    console.log(req.headers);

    next();
  } catch (error) {
    console.log(error);
    res.send(error.message);
    return;
  }
};
