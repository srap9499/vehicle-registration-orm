'use strict';

const listWithVehicleState = require('../controllers/list-with-vehicle-state.controller');

const express = require('express');
const router = express.Router();

router.get('/', listWithVehicleState.findAll);

router.get('/targetState', listWithVehicleState.findByState);

module.exports = router;