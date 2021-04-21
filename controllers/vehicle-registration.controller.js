'use strict';

const db = require('../models/db.model');
const VehicleRegistration = db.vehicleRegistration;

exports.avoidDuplicateVehicleRegistration = async (req, res, next) => {
    try {
        const vehicleRegistrationData = req.vehicleRegistrationData;
        if (!vehicleRegistrationData) {
            res.status(400).send('Invalid request');
        } else {
            const vehicleRegistration = await VehicleRegistration.findOne({ where: vehicleRegistrationData });
            if (vehicleRegistration) {
                res.status(208).send('Vehicle Registration already exists');
            } else {
                next();
            }
        }
    } catch (error) {
        console.log('Error occured while duplicate Vehicle Registration check: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.create = async (req, res, next) => {
    try {
        const vehicleRegistrationData = req.vehicleRegistrationData;
        const vehicleRegistration = await VehicleRegistration.create(vehicleRegistrationData);
        res.status(200).send({ "Vehicle Registered Successfully": vehicleRegistration });
    } catch (error) {
        console.log('Error occured while creating new Vehicle Registration: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const vehicleRegistrations = await VehicleRegistration.findAll();
        if (vehicleRegistrations) {
            res.status(200).send({"Vehicle Registrations": vehicleRegistrations});
        } else {
            res.status(404).send({"Vehicle Registrations": "No vehicle registrations data found!"});
        }
    } catch(error) {
        console.log('Error occured while fetching All Vehicle Registrations Data: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const vehicleRegistration = await VehicleRegistration.findOne({ where: { id: id } });
        if (vehicleRegistration) {
            res.status(200).send({"Vehicle Registration": vehicleRegistration});
        } else {
            res.status(404).send({"Vehicle Registration": "No vehicle registration data found!"});
        }
    } catch(error) {
        console.log('Error occured while fetching Vehicle Registration Data by Id: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.isVehicleRegistration = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send("Invalid ID");
        } else {
            const vehicleRegistration = await VehicleRegistration.findOne({ where: { id: id } });
            if (vehicleRegistration) {
                next();
            } else {
                res.status(404).send({"Vehicle Registration": "No vehicle registration data found!"});
            }
        }
    } catch(error) {
        console.log('Error occured while checking existance of Vehicle Registration Data: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const vehicleRegistrationData = req.vehicleRegistrationData;
        const vehicleRegistration = await VehicleRegistration.update(vehicleRegistrationData, { where: { id: id } });
        res.status(200).send({ "Updated Vehicle Registration Data": vehicleRegistration[0] });
    } catch(error) {
        console.log('Error occured while updating Vehicle Registration Data: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const vehicleRegistration = await VehicleRegistration.destroy({ where: { id: id } });
        res.status(200).send({ "Deleted Vehicle Registration Data": vehicleRegistration });
    } catch(error) {
        console.log('Error occured while deleting Vehicle Registration Data: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};