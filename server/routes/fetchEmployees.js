const express = require('express');
const router = express.Router();
const { getAllEmployees } = require('../controllers/fetchEmployees.js');

router.get('/employees', getAllEmployees);
module.exports = router;   