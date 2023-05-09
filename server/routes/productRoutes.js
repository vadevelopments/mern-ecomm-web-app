const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// GET all products
router.get('/', productController.getAllProducts);

// GET a single product by ID
router.get('/:id', productController.getProductById);

// CREATE a new product
router.post('/', authMiddleware, productController.createProduct);

// UPDATE a product by ID
router.put('/:id', authMiddleware, productController.updateProductById);

// DELETE a product by ID
router.delete('/:id', authMiddleware, productController.deleteProductById);

module.exports = router;