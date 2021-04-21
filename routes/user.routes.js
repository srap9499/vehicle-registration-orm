'use strict';

const express = require('express');
const router = express();

const validate = require('../middlewares/validate.middleware');
const userController = require('../controllers/user.controller');

// Add User (User Sign Up)
router.post('/signUp', validate.createUser, userController.avoidDuplicateUser, userController.create);

// GET all user data
router.get('/all', userController.findAll);

// Get User By Id
router.get('/:id', userController.findById);

// Update any field of User By Id
router.put('/:id', validate.updateUser, userController.isUser, userController.update);

// Delete User By Id
router.delete('/:id', userController.isUser, userController.delete);

module.exports = router;