'use strict';

const db = require('../models/db.model');
const Vehicle = db.vehicle;

console.log(Vehicle);

exports.create = async (req, res) => {
    const { Name, Type } = req.body;

    if (!Name || !Type) {
        res.status(400).send('Invalid');
    } else {
        try {
            await Vehicle.create({name: Name, type: Type});
            res.status(200).send(`inserted: Successfully!`);
        } catch(error) {
            res.status(500).send(error.message);
        }
    }
};

exports.findAll = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.status(200).send({ "Vehicle Data": vehicles });
    } catch(error) {
        res.status(500).send(err.message);
    }
};

exports.findOne = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).send('Invalid!');
    } else {
        try {
            const vehicle = await Vehicle.findOne({where: {id: id}});
            if (vehicle) {
                res.status(200).send({ "Vehicle": vehicle });
            } else {
                res.status(404).send({ message: 'No vehicle found!'});
            }
        } catch(error) {
            res.status(500).send(error.message);
        }
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { Name, Type} = req.body;
    const data = {};
    if (Name) {
        data.name = Name;
    }
    if (Type) {
        data.type = Type;
    }

    if (!id || Object.keys(data).length < 1) {
        res.status(400).send('Invalid!');
    } else {
        try {
            const vehicle = await Vehicle.update(data,{where: {id: id}});
            if (vehicle[0]) {
                res.status(200).send({ "Vehicle": vehicle });
            } else {
                res.status(404).send({ message: 'No vehicle updated!'});
            }
        } catch(error) {
            res.status(500).send(error.message);
        }
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).send('Invalid!');
    } else {
        try {
            const vehicle = await Vehicle.destroy({where: {id: id}});
            if (vehicle) {
                res.status(200).send({ "Vehicle": vehicle });
            } else {
                res.status(404).send({ message: 'No vehicle deleted!'});
            }
        } catch(error) {
            res.status(500).send(error.message);
        }
    }
};

