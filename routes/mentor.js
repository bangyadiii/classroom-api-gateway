const express = require("express");
const router = express.Router();
const {
    create,
    update,
    deleteMentor,
    getAll,
    showMentorDetails,
} = require("./handler/mentors/");
const verifyToken = require("../middleware/verifyToken");
const can = require("../middleware/permissions");

router.put("/:id", verifyToken, can("admin"), update);
router.delete("/:id", verifyToken, can("admin"), deleteMentor);
router.get("/:id", showMentorDetails);
router.post("/", verifyToken, can("admin"), create);
router.get("/", getAll);

module.exports = router;
