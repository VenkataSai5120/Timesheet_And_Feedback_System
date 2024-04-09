const express = require("express");
const { getAllProjects } = require("../controllers/fetchProjects.js");
const router = express.Router();

router.post("/projects", getAllProjects);
module.exports = router;