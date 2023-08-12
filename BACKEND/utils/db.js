const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize(
  "expensetracker",
  "root",
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
    logging: false,
  }
);

module.exports = sequelize;
