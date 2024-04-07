const express = require("express");
const { saveFeedback } = require("../controllers/SaveFeedback.js");
const router = express.Router();

router.post("/questions", saveFeedback);
module.exports = router;