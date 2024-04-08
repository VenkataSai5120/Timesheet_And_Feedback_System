const express = require("express");
const { saveProject } = require("../controllers/saveProjects.js");
const router = express.Router();

router.post("/project", saveProject);
module.exports = router;