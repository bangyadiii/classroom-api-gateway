var express = require("express");
var router = express.Router();
const { register, login } = require("./handler/users/index");
// register
router.post("/register", register);

module.exports = router;
