var express = require("express");
const mediaHandler = require("./handler/media");
var router = express.Router();

router.delete("/:id", mediaHandler.destroy);
router.post("/", mediaHandler.create);
router.get("/", mediaHandler.getMedia);

module.exports = router;
