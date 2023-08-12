const { STRING } = require("sequelize");
const sequelize = require("../utils/db");

const ForgotPasswordRequest = sequelize.define("ForgotPasswordRequest", {
  id: { primaryKey: true, allowNull: false, type: STRING },
  isActive: { type: STRING, defaultValue: true },
});

module.exports = ForgotPasswordRequest;
