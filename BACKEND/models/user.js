const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define("user", {
  email: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: { type: Sequelize.STRING, allowNull: false },
  totalExpense: { type: Sequelize.INTEGER, defaultValue: 0 },
  name: { type: Sequelize.STRING, allowNull: false },
  premium: { type: Sequelize.BOOLEAN, defaultValue: false },
});

module.exports = User;
