const express = require("express");
const router = express.Router();
const { create, findById } = require("./handler/mycourse/");
const verifyToken = require("../middleware/verifyToken");
const can = require("../middleware/permissions");

router.post("/", verifyToken, can("student", "admin"), create);
router.get("/", findById);

module.exports = router;
