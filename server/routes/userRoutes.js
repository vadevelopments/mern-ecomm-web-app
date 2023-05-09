const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', authMiddleware, userController.getAllUsers);

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', userController.getUserById);

// @route   POST api/users
// @desc    Create a new user
// @access  Public
router.post('/', userController.createUser);

// @route   PUT api/users/:id
// @desc    Update user by ID
// @access  Public
router.put('/:id', userController.updateUserById);

// @route   DELETE api/users/:id
// @desc    Delete user by ID
// @access  Public
router.delete('/:id', userController.deleteUserById);

// // @route   POST api/login
// // @desc    Login user
// // @access  Public
// router.post('/login', authController.loginUser);

module.exports = router;