const Product = require('../models/product');
// const User = require('../models/user');

async function getAllProducts(req, res) {
	try {
		const products = await Product.getAllProducts();
		res.json(products);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
}

async function getProductById(req, res) {
	try {
		const product = await Product.findById(req.params.id).exec();
		if (!product) {
			res.status(404).json({ error: 'Product not found' });
		} else {
			res.json(product);
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
}

async function createProduct(req, res) {
	try {
		const { name, description, price, image, category, countInStock } = req.body;
		const product = new Product({
			name,
			description,
			price,
			image,
			category,
			countInStock,
			user: req.user.id
		});
		const newProduct = await product.save();
		console.log('Product created successfully.');
		res.status(201).json({ message: "Product created successfully." , newProduct });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
}

async function updateProductById(req, res) {
	try {
		const { name, description, price, image, category, countInStock } = req.body;
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{ name, description, price, image, category, countInStock },
			{ new: true }
		).exec();
		if (!product) {
			res.status(404).json({ error: 'Product not found' });
		} else {
			console.log('Product updated successfully.');
			res.json(product);
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
}

async function deleteProductById(req, res) {
	try {
		const product = await Product.findByIdAndDelete(req.params.id).exec();
		if (!product) {
			res.status(404).json({ error: 'Product not found' });
		} else {
			res.json({ message: 'Product deleted successfully' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
}

// Get all user's products
async function getUserProducts(req, res) {
	try{
		const userId = req.user.id;
		const products = await Product.find({ user: userId });
		// console.log(products);
		res.json(products);
	} catch {
		res.status(500).json({ errorMsg: "Connection to getUserProducts failed", error: 'Server error' });
	}
} 

module.exports = { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById, getUserProducts };