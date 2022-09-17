const express = require("express");
const router = express.Router();
const { create, update } = require("./handler/review/");
const verifyToken = require("../middleware/verifyToken");
const can = require("../middleware/permissions");

router.post("/", verifyToken, can("student", "admin"), create);
router.put("/", verifyToken, can("student", "admin"), update);

module.exports = router;
