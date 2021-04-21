'use strict';

const express = require('express');
const router = express();

const validate = require('../middlewares/validate.middleware');
const vehicleRegistrationController = require('../controllers/vehicle-registration.controller');

// Add Vehicle Registration
router.post(
    '/new',
    validate.createVehicleRegistration,
    vehicleRegistrationController.avoidDuplicateVehicleRegistration,
    vehicleRegistrationController.create
);

// GET all Vehicle Registration data
router.get('/all', vehicleRegistrationController.findAll);

// Get Vehicle Registration By Id
router.get('/:id', vehicleRegistrationController.findById);

// Update any field of Vehicle Registration By Id
router.put(
    '/:id',
    validate.updateVehicleRegistration,
    vehicleRegistrationController.isVehicleRegistration,
    vehicleRegistrationController.update
);

// Delete Vehicle Registration By Id
router.delete(
    '/:id',
    vehicleRegistrationController.isVehicleRegistration,
    vehicleRegistrationController.delete
);

module.exports = router;