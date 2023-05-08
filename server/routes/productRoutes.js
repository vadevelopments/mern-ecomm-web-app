const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/', productController.getAllProducts);

// GET a single product by ID
router.get('/:id', productController.getProductById);

// CREATE a new product
router.post('/', productController.createProduct);

// UPDATE a product by ID
router.put('/:id', productController.updateProductById);

// DELETE a product by ID
router.delete('/:id', productController.deleteProductById);

module.exports = router;