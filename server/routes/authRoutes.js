const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', authController.loginUser);

// @route GET api/auth/logout
// @desc Logout user
// @access Private
router.get('/logout', authMiddleware, authController.logoutUser);

module.exports = router;