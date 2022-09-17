const express = require("express");
const router = express.Router();
const {
    create,
    update,
    destroy,
    getAll,
    getById,
} = require("./handler/chapter/");
const verifyToken = require("../middleware/verifyToken");
const can = require("../middleware/permissions");

router.put("/:id", verifyToken, can("admin"), update);
router.delete("/:id", verifyToken, can("admin"), destroy);
router.get("/:id", getById);
router.post("/", verifyToken, can("admin"), create);
router.get("/", getAll);

module.exports = router;
