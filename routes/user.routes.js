'use strict';

const express = require('express');
const router = express();

const validate = require('../middlewares/validate.middleware');
const { authorise, authenticate } = require('../middlewares/auth.middleware');
const user = require('../controllers/user.controller');

// Add User (User Sign Up)
router.post('/signUp', validate.createUser, user.avoidDuplicateUser, user.signUp);

// User Sign In
router.post('/signIn',user.validateSignIn, authorise);

// User Dashboard
router.get('/signIn/dashboard', authenticate, user.getDashboard );

// GET all user data
router.get('/all', user.findAll);

// Get User By Id
router.get('/:id', user.findById);

// Update any field of User By Id
router.put('/:id', validate.updateUser, user.isUser, user.update);

// Delete User By Id
router.delete('/:id', user.isUser, user.delete);

module.exports = router;