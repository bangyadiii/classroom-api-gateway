const express = require("express");
const router = express.Router();
const { register, login, update, getUser } = require("./handler/users/");
const { refresh_token } = require("./handler/refresh-token/");
const verifyToken = require("../middleware/verifyToken");
const logout = require("./handler/users/logout");

router.post("/refresh-token", refresh_token);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.put("/:id", verifyToken, update);
router.get("/:id", verifyToken, getUser);

module.exports = router;
