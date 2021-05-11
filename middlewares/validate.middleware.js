'use strict';

const createError = require('http-errors');
const bcrypt = require('bcryptjs');

// Middleware to Validate all required fields for creating User
exports.createUser = async (req, res, next) => {
    try {
        const { Name: name, Email: email, Password: password, StateID: state_id, Status: status } = req.body;
        if (!name || !email || !password || !state_id || !status) {
            next(createError(400, 'Please provide all required fields for Sign-Up: Name, Email, Password, StateID, Status!'));
        } else {
            const encryptPass = new Promise((resolve, reject) => {
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                        reject(err);
                    } else {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(hash);
                            }
                        });
                    }
                });
            });
            encryptPass
                .then((password) => {
                    req.userData = {
                        name,
                        email,
                        password,
                        state_id,
                        status: status == true ? '1' : '0'
                    }
                    next();
                })
                .catch((error) => {
                    console.log(error);
                    next(createError("Something went wrong!"));
                });
        }
    } catch (error) {
        console.log('Error occured while validating input for create user: ', error.message);
        next(error);
    }
};

// Middleware to Validate all required fields for updating User
exports.updateUser = async (req, res, next) => {
    try {
        console.log(req.params.id);

        const { Name, Email, Password, StateID, Status } = req.body;

        if (!Name && !Email && !Password && !StateID && !Status) {
            next(createError(400, 'Please provide atleast one required field to update: Name/Email/Password/StateID/Status'));
        } else {
            const data = {};
            if (Name) {
                data.name = Name;
            }
            if (Email) {
                data.email = Email;
            }
            if (Password) {
                const encryptPass = new Promise((resolve, reject) => {
                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        if (err) {
                            reject(err);
                        } else {
                            bcrypt.hash(Password, salt, (err, hash) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(hash);
                                }
                            });
                        }
                    });
                });
                encryptPass
                    .then((password) => {
                        data.password = password;
                    })
                    .catch((error) => {
                        console.log(error);
                        next(createError("Something went wrong!"));
                    });
            }
            if (StateID) {
                data.state_id = StateID;
            }
            if (Status) {
                data.status = Status == true ? '1' : '0';
            }
            req.userData = data;
            next();
        }
    } catch (error) {
        console.log('Error occured while validating input for update user: ', error.message);
        next(error);
    }
};

// Middleware to Validate all required fields for creating Vehicle Registration
exports.createVehicleRegistration = async (req, res, next) => {
    try {
        const { UserID, VehicleID, RegistrationDate, ExpiryDate } = req.body;
        if (!UserID || !VehicleID || !RegistrationDate || !ExpiryDate) {
            next(createError(400, 'Please provide all required fields for Vehicle Registration: UserID, VehicleID, RegistrationDate, ExpiryDate!'));
        } else {
            req.vehicleRegistrationData = {
                user_id: UserID,
                vehicle_id: VehicleID,
                registration_date: new Date(RegistrationDate),
                expiry_date: new Date(ExpiryDate)
            }
            next();
        }
    } catch (error) {
        console.log('Error occured while validating input for create user: ', error.message);
        next(error);
    }
};

// Middleware to Validate all required fields for updating Vehicle Registration
exports.updateVehicleRegistration = async (req, res, next) => {
    try {
        console.log(req.params.id);

        const { UserID, VehicleID, RegistrationDate, ExpiryDate } = req.body;

        if (!UserID && !VehicleID && !RegistrationDate && !ExpiryDate) {
            next(createError(400, 'Please provide all required fields for Vehicle Registration: UserID/VehicleID/RegistrationDate/ExpiryDate!'));
        } else {
            const data = {};
            if (UserID) {
                data.user_id = UserID;
            }
            if (VehicleID) {
                data.vehicle_id = VehicleID;
            }
            if (RegistrationDate) {
                data.registration_date = new Date(RegistrationDate);
            }
            if (ExpiryDate) {
                data.expiry_date = new Date(ExpiryDate);
            }
            req.vehicleRegistrationData = data;
            next();
        }
    } catch (error) {
        console.log('Error occured while validating input for update user: ', error.message);
        next(error);
    }
};