const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// GET all products
router.get('/', productController.getAllProducts);

// @route   GET api/products/userProducts
// @desc    GET all user's products
// @access  Public
router.get('/userProducts', authMiddleware, productController.getUserProducts);

// GET a single product by ID
router.get('/:id', productController.getProductById);

// @route   POST api/products
// @desc    Create user's products
// @access  Public
router.post('/', authMiddleware, productController.createProduct);

// UPDATE a products by ID
router.put('/:id', productController.updateProductById);

// DELETE a products by ID
router.delete('/:id', authMiddleware, productController.deleteProductById);

module.exports = router;