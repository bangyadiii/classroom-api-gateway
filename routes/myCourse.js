const express = require("express");
const router = express.Router();
const { create, findByUserId } = require("./handler/mycourse");
const verifyToken = require("../middleware/verifyToken");
const can = require("../middleware/permissions");

router.post("/", verifyToken, can("student", "admin"), create);
router.get("/", verifyToken, can("student", "admin"), findByUserId);

module.exports = router;
