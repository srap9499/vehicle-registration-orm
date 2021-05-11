'use strict';

const createError = require('http-errors');
const db = require('../models/db.model');
const {
    user: User,
    vehicle: Vehicle,
    vehicleRegistration: VehicleRegistration
} = db;


// GET list with vehicle registration and vehicle data by target User
exports.findByUser = async (req, res, next) => {
    const { "User Name": name, Email: email } = req.body;
    let targetUser = {};
    if (name) {
        targetUser.name = name;
    }
    if (email) {
        targetUser.email = email;
    }
    await User.hasMany(VehicleRegistration, {
        foreignKey: "user_id"
    });
    await VehicleRegistration.belongsTo(User, {
        foreignKey: "user_id"
    });
    await Vehicle.hasMany(VehicleRegistration, {
        foreignKey: "vehicle_id"
    });
    await VehicleRegistration.belongsTo(Vehicle, {
        foreignKey: "vehicle_id"
    });

    await User.findAll({
        attributes: [
            ["id", "User ID"],
            ["Name", "User Name"],
            ["email", "Email"]
        ],
        where: targetUser,
        include: [
            {
                model: VehicleRegistration,
                attributes: [
                    ["id", "Registration ID"],
                ],
                include: {
                    model: Vehicle,
                    attributes: [
                        ["Name", "Vehicle Name"],
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
                next(createError(404, 'No user Data found!'));
            }
        })
        .catch((err) => {
            console.log("Error occured while fetching User data and vehicle Registration List By User: ", err.message);
            next(createError("Something went wrong"));
        });
};