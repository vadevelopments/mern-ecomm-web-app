const Product = require('../models/product');

async function getAllProducts(req, res) {
    try {
        const products = await Product.find().exec();
        console.log("products data has been fetch from API.");
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { getAllProducts };
