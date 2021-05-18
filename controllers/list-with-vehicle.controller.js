'use strict';

const createError = require('http-errors');
const { User } = require('../models/user.model');
const { Vehicle } = require('../models/vehicle.model');
const { VehicleRegistration } = require('../models/vehicle-registration.model');


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