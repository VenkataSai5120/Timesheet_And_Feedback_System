const express = require("express");
const { check } = require("../controllers/findUser.js");
const router = express.Router();

router.post("/check-user-exist", check);
module.exports = router;