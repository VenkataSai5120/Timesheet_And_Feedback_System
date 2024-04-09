const express = require("express");
const { getAllMappings } = require("../controllers/fetchMappings.js");
const router = express.Router();

router.post("/mappings", getAllMappings);
module.exports = router;