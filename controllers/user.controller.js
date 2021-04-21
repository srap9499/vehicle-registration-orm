'use strict';

const db = require('../models/db.model');
const User = db.user;

exports.avoidDuplicateUser = async (req, res, next) => {
    try {
        const email = req.userData.email;
        if (!email) {
            res.status(400).send('Invalid request');
        } else {
            const user = await User.findOne({ where: { email: email } });
            if (user) {
                res.status(208).send('User already exists');
            } else {
                next();
            }
        }
    } catch (error) {
        console.log('Error occured while duplicate user check: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.create = async (req, res, next) => {
    try {
        const userData = req.userData;
        const user = await User.create(userData);
        res.status(200).send({ "Signed Up Successfully": user.email });
    } catch (error) {
        console.log('Error occured while creating new user: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const users = await User.findAll();
        if (users) {
            res.status(200).send({"Users": users});
        } else {
            res.status(404).send({"Users": "No user data found!"});
        }
    } catch(error) {
        console.log('Error occured while fetching All User Data: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id: id } });
        if (user) {
            res.status(200).send({"User Data": user});
        } else {
            res.status(404).send({"Users": "No user data found!"});
        }
    } catch(error) {
        console.log('Error occured while fetching User Data by Id: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.isUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send("Invalid ID");
        } else {
            const user = await User.findOne({ where: { id: id } });
            if (user) {
                next();
            } else {
                res.status(404).send({"Users": "No user data found!"});
            }
        }
    } catch(error) {
        console.log('Error occured while checking existance of User Data: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = req.userData;
        const user = await User.update(userData, { where: { id: id } });
        if (user[0]) {
            res.status(200).send({ "Updated User Data": user[0] });
        } else {
            res.status(200).send({ "Updated User Data": user[0] });
        }
    } catch(error) {
        console.log('Error occured while updating User Data: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.destroy({ where: { id: id } });
        res.status(200).send({ "Deleted User Data": user });
    } catch(error) {
        console.log('Error occured while deleting User Data: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};