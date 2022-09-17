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
router.post("/", verifyToken, can("student", "admin"), create);
router.get("/", verifyToken, can("student", "admin"), getAll);

module.exports = router;
