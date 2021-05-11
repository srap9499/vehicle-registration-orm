'use strict';

const express = require('express');
const router = express.Router();
const {
    exportToCsv
} = require('../controllers/export-to-csv.controller');

// Export active user data with vehicle registration details to csv file
router.get('/', exportToCsv);

module.exports = router;