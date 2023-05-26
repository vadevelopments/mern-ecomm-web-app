const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/order
// @desc    POST order
// @access  Private
router.post('/', authMiddleware, orderController.createOrder);

// @route   GET api/order
// @desc    GET all orders
// @access  Private
router.get('/', authMiddleware, orderController.getAllOrders);

module.exports = router;