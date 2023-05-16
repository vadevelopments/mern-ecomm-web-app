const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/products/
// @desc    GET all products
// @access  Public
router.get('/', productController.getAllProducts);

// @route   GET api/products/userProducts
// @desc    GET all user's products
// @access  Public
router.get('/userProducts', productController.getUserProducts);

// @route   GET api/products/:id
// @desc    GET all product by id
// @access  Public
router.get('/:id', productController.getProductById);

// @route   POST api/products/
// @desc    Create user's products
// @access  Private
router.post('/', authMiddleware, productController.createProduct);

// @route   PUT api/products/:id
// @desc    Update user's product by ID
// @access  Private
router.put('/:id', authMiddleware, productController.updateProductById);

// @route   DELETE api/products/:id
// @desc    Delete product by ID
// @access  Private
router.delete('/:id', authMiddleware, productController.deleteProductById);

// @route   POST api/products/comments
// @desc    Post comment on a product
// @access  Private
router.post('/comments', authMiddleware, productController.addCommentToProduct);

// @route   DELETE api/products/comments/:commentId
// @desc    Delete comment on a product
// @access  Private
router.delete('/comments/:commentId', authMiddleware, productController.removeCommentFromProduct);

module.exports = router;