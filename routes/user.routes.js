'use strict';

const express = require('express');
const router = express();

const validate = require('../middlewares/validate.middleware');
const {
    authorise,
    authenticate
} = require('../middlewares/auth.middleware');
const User = require('../controllers/User.controller');

// Add User (User Sign Up)
router.post(
    '/signUp',
    validate.createUser,
    User.avoidDuplicateUser,
    User.signUp
);

// User Sign In
router.post(
    '/signIn',
    User.validateSignIn,
    authorise
);

// User Dashboard
router.get(
    '/signIn/dashboard',
    authenticate,
    User.getDashboard
);

// GET all User data
router.get('/all', User.findAll);

// Get User By Id
router.get('/:id', User.findById);

// Update any field of User By Id
router.put(
    '/:id',
    validate.updateUser,
    User.isUser,
    User.update
);

// Delete User By Id
router.delete(
    '/:id',
    User.isUser,
    User.delete
);

module.exports = router;