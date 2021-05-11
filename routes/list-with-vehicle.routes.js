'use strict';

const listWithVehicle = require('../controllers/list-with-vehicle.controller');

const express = require('express');
const router = express.Router();

// GET list with vehicle registration and vehicle data by target User
router.get('/targetUser', listWithVehicle.findByUser);

module.exports = router;