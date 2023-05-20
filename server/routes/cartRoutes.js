const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/cart/add
// @desc    POST add cart
// @access  Private
router.post('/add', authMiddleware, cartController.addToCart);

// @route   DELETE api/cart/delete
// @desc    DELETE cart
// @access  Private
router.delete('/delete', authMiddleware, cartController.updateQuantity );

// @route   GET api/cart
// @desc    GET all carts associated with a specific user ID
// @access  Private
router.get('/', authMiddleware, cartController.getAllCartsByUserId);

module.exports = router;