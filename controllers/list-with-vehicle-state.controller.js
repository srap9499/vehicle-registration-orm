'use strict';

const createError = require('http-errors');
const db = require('../models/db.model');
const {
    state: State,
    user: User,
    vehicle: Vehicle,
    vehicleRegistration: VehicleRegistration
} = db;

exports.findAll = async (req, res, next) => {
    await User.belongsTo(State, {
        foreignKey: "state_id"
    });
    await State.hasMany(User, {
        foreignKey: "state_id"
    });
    await VehicleRegistration.belongsTo(User, {
        foreignKey: "user_id"
    });
    await User.hasMany(VehicleRegistration, {
        foreignKey: "user_id"
    });
    await VehicleRegistration.belongsTo(Vehicle, {
        foreignKey: "vehicle_id"
    });
    await Vehicle.hasMany(VehicleRegistration, {
        foreignKey: "vehicle_id"
    });

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

exports.findByState = async (req, res, next) => {
    const { "State Name": StateName } = req.body;

    if (!StateName) {
        next(createError(400, 'Please provide target State Name!'));
    } else {
        await User.belongsTo(State, {
            foreignKey: "state_id"
        });
        await State.hasMany(User, {
            foreignKey: "state_id"
        });
        await VehicleRegistration.belongsTo(User, {
            foreignKey: "user_id"
        });
        await User.hasMany(VehicleRegistration, {
            foreignKey: "user_id"
        });
        await VehicleRegistration.belongsTo(Vehicle, {
            foreignKey: "vehicle_id"
        });
        await Vehicle.hasMany(VehicleRegistration, {
            foreignKey: "vehicle_id"
        });

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