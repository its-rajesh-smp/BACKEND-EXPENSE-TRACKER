const jwt = require("jsonwebtoken");
exports.createJwt = (data) => {
  return jwt.sign(data, process.env.SECRET);
};

exports.verifyJwt = (idToken) => {
  return jwt.verify(idToken, process.env.SECRET);
};
