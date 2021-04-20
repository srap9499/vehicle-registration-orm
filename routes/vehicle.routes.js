'use strict';

const express = require('express');
const vehicleController = require('../controllers/vehicle.controller');
const router = express();


router.post('/', vehicleController.create);

router.get('/', vehicleController.findAll);

router.get('/:id', vehicleController.findOne);

router.put('/:id', vehicleController.update);

router.delete('/:id', vehicleController.delete);

module.exports = router;