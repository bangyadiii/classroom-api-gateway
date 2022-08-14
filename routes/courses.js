const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    return res.status(200).json({ message: "course" });
});

module.exports = router;
