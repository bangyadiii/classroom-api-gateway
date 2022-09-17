const express = require("express");
const mediaHandler = require("./handler/imageCourse");
const router = express.Router();
const can = require("../middleware/permissions");
const verifyToken = require("../middleware/verifyToken");

router.delete("/:id", mediaHandler.destroy);
router.post("/", mediaHandler.create);

module.exports = router;
