const Joi = require('joi');
const Product = require('../models/product');

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
		const schema = Joi.object({
			name: Joi.string().required(),
			description: Joi.string().required(),
			price: Joi.number().required(),
			image: Joi.string().required(),
			category: Joi.string().required(),
			countInStock: Joi.number().required()
		});
	
		const { error, value } = schema.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
	
		const product = new Product({
			name: value.name,
			description: value.description,
			price: value.price,
			image: value.image,
			category: value.category,
			countInStock: value.countInStock,
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
		const schema = Joi.object({
			name: Joi.string(),
			description: Joi.string(),
			price: Joi.number(),
			image: Joi.string(),
			category: Joi.string(),
			countInStock: Joi.number()
		});
	
		const { error, value } = schema.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
	
		const productData = {
			updatedAt: Date.now(),
			...(value.name && { name: value.name }),
			...(value.description && { description: value.description }),
			...(value.price && { price: value.price }),
			...(value.image && { image: value.image }),
			...(value.category && { category: value.category }),
			...(value.countInStock && { countInStock: value.countInStock })
		};
	
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			productData,
			{ new: true }
		).exec();
	
		if (!product) {
			res.status(404).json({ error: 'Product not found' });
		} else {
			console.log('Product updated successfully.');
			res.status(201).json({ message: "Product updated successfully." , product });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error',  errormsg: "Product update failed." });
	}
}

async function deleteProductById(req, res) {
	try {
		const product = await Product.findByIdAndDelete(req.params.id).exec();
		if (!product) {
			res.status(404).json({ message: 'Product not found' });
		} else {
			console.log("Product deleted successfully")
			res.status(200).json({ message: 'Product deleted successfully' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
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