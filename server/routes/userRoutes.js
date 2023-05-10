const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
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
router.post('/register', userController.createUser);

// @route   PUT api/users/:id
// @desc    Update user by ID
// @access  Public
router.put('/:id', userController.updateUserById);

// @route   DELETE api/users/:id
// @desc    Delete user by ID
// @access  Public
router.delete('/:id', userController.deleteUserById);

// @route   POST api/resetpassword
// @desc    Reset password
// @access  Public
router.post('/resetpassword', authMiddleware, userController.resetPassword);

// @route   POST api/users/reset-password
// @desc    Send reset password email
// @access  Public
router.post('/reset-token', authMiddleware, userController.sendResetPasswordEmail);

// // @route   POST api/login
// // @desc    Login user
// // @access  Public
// router.post('/login', authController.loginUser);

module.exports = router;