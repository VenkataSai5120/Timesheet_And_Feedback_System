const express = require("express");
const { updateUserPassword } = require("../controllers/updatePassword.js");
const router = express.Router();

router.post("/reset-password", updateUserPassword);
module.exports = router;