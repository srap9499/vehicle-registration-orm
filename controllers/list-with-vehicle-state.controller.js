'use strict';

const createError = require('http-errors');
const { State } = require('../models/state.model');
const { User } = require('../models/user.model');
const { Vehicle } = require('../models/vehicle.model');
const { VehicleRegistration } = require('../models/vehicle-registration.model');

// Get List of User Data with state name vehicle registration data
exports.findAll = async (req, res, next) => {
    await User.findAll({
        attributes: [
            ["id", "User ID"],
            ["Name", "User Name"],
            ["email", "Email"]
        ],
        include: [
            {
                model: State,
                attributes: [
                    "StateName"
                ]
            },
            {
                model: VehicleRegistration,
                attributes: [
                    ["id", "Registration ID"]
                ],
                include: {
                    model: Vehicle,
                    attributes: [
                        ["Name", " Vehicle Name"],
                        ["Type", "Vehicle Type"]
                    ]
                }
            }
        ]
    })
        .then((data) => {
            if (data.length) {
                res.status(200).send(data);
            } else {
                next(createError(404, "No User Data found with vehicle and state!"));
            }
        })
        .catch((err) => {
            console.log("Error occured while fetching User data and vehicle registration with State: ", err.message);
            next(createError("Something went wrong"));
        });
};

// Get List of User Data with state name vehicle registration data by target State
exports.findByState = async (req, res, next) => {
    const { "State Name": StateName } = req.body;
    if (!StateName) {
        next(createError(400, 'Please provide target State Name!'));
    } else {
        await State.findAll({
            attributes: [
                ["StateName", "State Name"]
            ],
            where: {
                StateName
            },
            include: [
                {
                    model: User,
                    attributes: [
                        ["id", "User ID"],
                        ["Name", "User Name"],
                        ["email", "Email"]
                    ],
                    include: {
                        model: VehicleRegistration,
                        attributes: [
                            ["id", "Registration ID"]
                        ],
                        include: {
                            model: Vehicle,
                            attributes: [
                                ["Name", " Vehicle Name"],
                                ["Type", "Vehicle Type"]
                            ]
                        }
                    }
                }
            ]
        })
            .then((data) => {
                if (data.length) {
                    res.status(200).send(data);
                } else {
                    next(createError(404, `No state data found for State Name: '${StateName}'`));
                }
            })
            .catch((err) => {
                console.log("Error occured while fetching User data and vehicle registration List By State: ", err.message);
                next(createError("Something went wrong"));
            });
    }
};