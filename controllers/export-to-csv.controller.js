'use strict';

const createError = require('http-errors');
const db = require('../models/db.model');
const {
    user: User,
    vehicleRegistration: VehicleRegistration,
    vehicle: Vehicle
} = db;
const { json2csv } = require('json-2-csv');
const fs = require('fs');

// Export active user data with vehicle registration details to csv file
exports.exportToCsv = async (req, res, next) => {
    await User.hasMany(VehicleRegistration, {
        foreignKey: "user_id"
    });
    await VehicleRegistration.belongsTo(User, {
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
            ["name", "User Name"],
            ["email", "Email ID"],
        ],
        where: {
            status: '1'
        },
        include: {
            model: VehicleRegistration,
            attributes: [
                ["id", "Registration ID"],
                ["registration_date", "Registration Date"],
                ["expiry_date", "Expiry Date"]
            ],
            include: {
                model: Vehicle,
                attributes: [
                    ["name", "Vehicle Name"],
                    ["type", "Vehicle Type"]
                ]
            }
        }
    })
        .then((data) => {
            if (!data.length) {
                next(createError(404, "No such data found!"));
            } else {
                return Promise.resolve(data);
            }
        })
        .then(async (data) => {
            data = await JSON.parse(JSON.stringify(data));
            json2csv(data, (err, csv) => {
                if (err) {
                    console.log(err);
                    next(createError("Something went wrong!"));
                } else {
                    fs.writeFileSync("vehicle data.csv", csv);
                    res.status(200).send("data exported successfully!");
                }
            })
        })
        .catch((error) => {
            console.log(error);
            next(createError("Something went wrong!"));
        })
};