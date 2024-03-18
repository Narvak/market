const express = require("express");
const router = express.Router();

const { signup, login } = require("../Controllers/UserController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
