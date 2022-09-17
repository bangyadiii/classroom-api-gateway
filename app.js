const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const can = require("./middleware/permissions");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mediaRouter = require("./routes/media");
const courseRouter = require("./routes/courses");
const paymentRouter = require("./routes/payments");
const orderRouter = require("./routes/orders");
const mentorRouter = require("./routes/mentor");
const reviewRouter = require("./routes/review");

const verifyToken = require("./middleware/verifyToken");
const app = express();

app.use(logger("common"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/orderRouter", verifyToken, orderRouter);
app.use("/api/v1/payments", verifyToken, paymentRouter);
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/mentors", mentorRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/", indexRouter);

// end point not found handling.
app.use((req, res, next) => {
    const error = new Error("Not found.");
    error.status = 404;
    next(error);
});

// error handling
app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.status || 500;
    const message = error.message;

    return res.status(statusCode).json({
        meta: {
            succes: false,
            message: message,
        },
        data: [],
    });
});

module.exports = app;
