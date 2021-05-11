'use strict';

const listWithVehicle = require('../controllers/list-with-vehicle.controller');

const express = require('express');
const router = express.Router();

router.get('/targetUser', listWithVehicle.findByUser);

module.exports = router;