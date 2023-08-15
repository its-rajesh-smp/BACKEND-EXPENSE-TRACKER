require("dotenv").config();

const fs = require("fs");
const path = require("path");

const express = require("express");
const sequelize = require("./utils/db");
const body_parser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const accessLogSteam = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const app = express();
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogSteam }));
app.use(body_parser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// ROUTES
const user = require("./routes/user");
const expense = require("./routes/expense");
const payment = require("./routes/payment");
const forgotpassword = require("./routes/forgotPassword");
const downloadUrl = require("./routes/downloadURL");

// MIDDLEWARES
app.use(user);
app.use(expense);
app.use(payment);
app.use(forgotpassword);
app.use(downloadUrl);

// RELATIONS
require("./relations/relations")();

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => console.log("APP START"));
  })
  .catch((err) => console.log(err));
