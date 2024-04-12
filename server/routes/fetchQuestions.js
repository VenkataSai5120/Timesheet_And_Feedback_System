const express = require("express");
const { getQuestions } = require("../controllers/fetchQuestions.js");
const router = express.Router();

router.post("/questions", getQuestions);
module.exports = router;