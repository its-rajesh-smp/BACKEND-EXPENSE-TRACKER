const { INTEGER, STRING } = require("sequelize");
const sequelize = require("../utils/db");

const Expense = sequelize.define("expense", {
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  category: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: INTEGER,
    allowNull: false,
  },
});

module.exports = Expense;
