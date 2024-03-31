// import frameworks and functionalities
const express = require("express");
const { login } = require("../controllers/auth.js");

// create a router instance
const router = express.Router();

// post the login requests and export the module
router.post("/login", login);
module.exports = router;