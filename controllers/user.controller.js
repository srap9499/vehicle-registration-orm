'use strict';

const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const db = require('../models/db.model');
const User = db.user;

exports.avoidDuplicateUser = async (req, res, next) => {
    try {
        const email = req.userData.email;
        if (!email) {
            next(createError(400, "Invalid Request! Provide Email!"))
        } else {
            const user = await User.findOne({ where: { email } });
            if (user) {
                next(createError(400, `User already exists with Email Id: ${email}`));
            } else {
                next();
            }
        }
    } catch (error) {
        console.log('Error occured while duplicate user check: ', error.message);
        next(error);
    }
};

exports.signUp = async (req, res, next) => {
    try {
        const userData = req.userData;
        const user = await User.create(userData);
        res.status(200).send({ "Signed Up Successfully": user.email });
    } catch (error) {
        console.log('Error occured while creating new user: ', error.message);
        next(error);
    }
};

exports.validateSignIn = async (req, res, next) => {
    const { "Email ID": email, Password: password } = req.body;
    if (!email || !password) {
        next(createError(400, 'Please provide Email ID & Password!'));
    } else {
        await User.findOne({
            attributes: [
                "name",
                "email",
                "password"
            ],
            where: {
                email
            }
        })
        .then((data) => {
            if (!data) {
                next(createError(400, "Invalid Email Id!"));
            } else if (data.password != password) {
                next(createError(400, "Incorrect Password!"));
            } else {
                const userData = {
                    name: data.name,
                    email: data.email
                };
                req.userData = userData;
                next();
            }
        })
        .catch((err) => {
            console.log("Error occured while Signing In: ", err.message);
            next(createError('Something went wrong!'));
        });
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const users = await User.findAll();
        if (users) {
            res.status(200).send({"Users": users});
        } else {
            next(createError(404,'No user data found!'));
        }
    } catch(error) {
        console.log('Error occured while fetching All User Data: ', error.message);
        next(error);
    }
};

exports.findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });
        if (user) {
            res.status(200).send({"User Data": user});
        } else {
            next(createError(404,'No user data found!'));
        }
    } catch(error) {
        console.log('Error occured while fetching User Data by Id: ', error.message);
        next(error);
    }
};

exports.isUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            next(createError(400, 'Please provide propper User Id!'));
        } else {
            const user = await User.findOne({ where: { id: id } });
            if (user) {
                next();
            } else {
                next(createError(404,`No user data found with ID: ${id}`));
            }
        }
    } catch(error) {
        console.log('Error occured while checking existance of User Data: ', error.message);
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = req.userData;
        const user = await User.update(userData, { where: { id: id } });
        res.status(200).send({ "Updated User Data": user[0] });
    } catch(error) {
        console.log('Error occured while updating User Data: ', error.message);
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.destroy({ where: { id: id } });
        res.status(200).send({ "Deleted User Data": user });
    } catch(error) {
        console.log('Error occured while deleting User Data: ', error.message);
        next(error);
    }
};

exports.getDashboard = async (req, res, next) => {
    
};