const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_ROOT,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    logging: false,
  }
);

module.exports = sequelize;
