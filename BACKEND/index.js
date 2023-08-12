require("dotenv").config();

const express = require("express");
const sequelize = require("./utils/db");
const body_parser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(body_parser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// ROUTES
const user = require("./routes/user");
const expense = require("./routes/expense");
const payment = require("./routes/payment");

// MIDDLEWARES
app.use(user);
app.use(expense);
app.use(payment);

// RELATIONS
require("./relations/relations")();

sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => console.log("APP START"));
  })
  .catch((err) => console.log(err));
