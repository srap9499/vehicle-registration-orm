'use strict';

const listWithVehicleState = require('../controllers/list-with-vehicle-state.controller');

const express = require('express');
const router = express.Router();

// Get List of User Data with state name vehicle registration data
router.get('/', listWithVehicleState.findAll);

// Get List of User Data with state name vehicle registration data by target State
router.get(
    '/targetState',
    listWithVehicleState.findByState
);

module.exports = router;