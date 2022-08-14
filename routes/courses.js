const express = require("express");
const router = express.Router();
const { SUCCESS, ERROR } = require("../utils/response");

router.get("/", function (req, res, next) {
    return res.status(200).json({ message: "course" });
});

module.exports = router;
