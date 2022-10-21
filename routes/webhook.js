const express = require("express");
const router = express.Router();
const midtransHandler = require("./handler/webhook/midtransHandler");
const verifyToken = require("../middleware/verifyToken");
const can = require("../middleware/permissions");

router.post(
    "/notifications",
    verifyToken,
    can("student", "admin"),
    midtransHandler
);

module.exports = router;
