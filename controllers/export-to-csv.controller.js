'use strict';

const createError = require('http-errors');
const { User } = require('../models/user.model');
const { Vehicle } = require('../models/vehicle.model');
const { VehicleRegistration } = require('../models/vehicle-registration.model');
const { json2csv } = require('json-2-csv');
const fs = require('fs');

// Export active user data with vehicle registration details to csv file
exports.exportToCsv = async (req, res, next) => {
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