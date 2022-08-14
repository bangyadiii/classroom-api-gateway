var express = require("express");
const mediaHandler = require("./handler/media");
var router = express.Router();

router.get("/", mediaHandler.getMedia);

module.exports = router;
