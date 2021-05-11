'use strict';

const { sign, verify } = require('jsonwebtoken');
const createError = require('http-errors');

exports.authorise = async (req, res, next) => {
    const payload = req.userData;

    if (!payload) {
        next(createError(400, "Invalid Request"));
    } else {
        try {
            const token = sign(payload, "Hello", { expiresIn: 1 * 60 * 60 * 1000 });
            res
                .status(200)
                .send({
                    Message: "Ok! Successfully Signed In!",
                    Token: token
                });
        } catch(err) {
            console.log("Error occured while Authorization: ", err.message);
            next(createError('Something went wrong!'));
        }
    }
}

exports.authenticate = async (req, res, next) => {
    const authToken = req.headers["authorization"];

    if (!authToken) {
        next(createError(401, "Unauthorized!"));
    } else {
        try {
            const token = authToken.split(' ')[1];
            verify(token, "Hello", (err, data) => {
                if (err) {
                    next(createError(401, "Unauthorized!"));
                } else {
                    req.userData = {
                        name: data.name,
                        email: data.email
                    }
                    // res.status(200).send('Successfully Authenticated!');
                    next();
                }
            });
        } catch(err) {
            console.log("Error occured while Aunthenticattion: ", err.message);
            next(createError('Something went wrong!'));
        }
    }
}