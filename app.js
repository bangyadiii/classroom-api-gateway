const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mediaRouter = require("./routes/media");
const courseRouter = require("./routes/courses");
const paymentRouter = require("./routes/payments");
const orderRouter = require("./routes/orders");

const app = express();

app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/orderRouter", orderRouter);
app.use("/payments", paymentRouter);
app.use("/media", mediaRouter);
app.use("/courses", courseRouter);
app.use("/users", usersRouter);
app.use("/", indexRouter);

module.exports = app;
