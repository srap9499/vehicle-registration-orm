'use strict';

const createError = require('http-errors');
const { Vehicle } = require('../models/vehicle.model');

// Add Vehicle
exports.create = async (req, res, next) => {
    const { Name, Type } = req.body;

    if (!Name || !Type) {
        next(createError(400, 'Please provide all required data: Name and Type of Vehicle!'));
    } else {
        try {
            await Vehicle.create({ name: Name, type: Type });
            res.status(200).send(`Vehicle added successfully! : ${Name}`);
        } catch (error) {
            next(error);
        }
    }
};

// GET all Vehicle data
exports.findAll = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.status(200).send({ "Vehicle Data": vehicles });
    } catch (error) {
        next(error);
    }
};

// GET vehicle data by ID
exports.findOne = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        next(createError(400, 'Please provide propper Vehicle Id!'));
    } else {
        try {
            const vehicle = await Vehicle.findOne({ where: { id: id } });
            if (vehicle) {
                res.status(200).send({ "Vehicle": vehicle });
            } else {
                next(createError(404, 'No vehicle data found!'));
            }
        } catch (error) {
            next(error);
        }
    }
};

// Update vehicle data by ID
exports.update = async (req, res, next) => {
    const { id } = req.params;
    const { Name, Type } = req.body;
    const data = {};
    if (Name) {
        data.name = Name;
    }
    if (Type) {
        data.type = Type;
    }

    if (!id || Object.keys(data).length < 1) {
        next(createError(400, 'Please provide valid ID and atleast one required field to update: Name/Type of vehicle!)'));
    } else {
        try {
            const vehicle = await Vehicle.update(data, { where: { id } });
            if (vehicle[0]) {
                res.status(200).send({ "Vehicle": vehicle });
            } else {
                next(createError(400, 'No vehicle data updated!'));
            }
        } catch (error) {
            next(error);
        }
    }
};

// Delete vehicle data by ID
exports.delete = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        next(createError(400, 'Please provide propper Vehicle Id!'));
    } else {
        try {
            const vehicle = await Vehicle.destroy({ where: { id: id } });
            if (vehicle) {
                res.status(200).send({ "Vehicle Deleted Successfully": vehicle });
            } else {
                next(createError(400, 'No vehicle data deleted!'));
            }
        } catch (error) {
            next(error);
        }
    }
};

