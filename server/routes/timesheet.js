const express = require("express");
const { createTimesheet } = require("../controllers/timesheet.js");
const router = express.Router();

router.post("/timesheet", createTimesheet);
module.exports = router;