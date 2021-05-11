'use strict';

const express = require('express');
const vehicleController = require('../controllers/vehicle.controller');
const router = express();

// Add Vehicle
router.post('/', vehicleController.create);

// GET all vehicle
router.get('/', vehicleController.findAll);

// GET vehicle by ID
router.get('/:id', vehicleController.findOne);

// Update particular Vehicle by ID
router.put('/:id', vehicleController.update);

// Delete particular Vehicle by ID
router.delete('/:id', vehicleController.delete);

module.exports = router;