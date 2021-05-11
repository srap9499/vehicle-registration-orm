'use strict';

const express = require('express');
const router = express.Router();
const {
    exportToCsv
} = require('../controllers/export-to-csv.controller');

router.get('/', exportToCsv);

module.exports = router;