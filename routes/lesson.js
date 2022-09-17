const express = require("express");
const router = express.Router();
const {
    create,
    update,
    deleteLessons,
    getAll,
    findById,
} = require("./handler/lesson/");
const verifyToken = require("../middleware/verifyToken");
const can = require("../middleware/permissions");

router.put("/:id", verifyToken, can("admin"), update);
router.delete("/:id", verifyToken, can("admin"), deleteLessons);
router.get("/:id", findById);
router.post("/", verifyToken, can("admin"), create);
router.get("/", getAll);

module.exports = router;
