const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	image: { type: String, required: true },
	countInStock: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    },
    {   
        timestamps : true
    }
);

productSchema.statics.getAllProducts = async function () {
    try {
		const products = await this.find().exec();
		console.log('Fetched products from database');
		return products;
    } catch (err) {
		console.error(err);
		throw new Error('Error fetching products from database');
    }
};

// Some validation to ensure the data is correct before saving/updating the product.

productSchema.statics.getProductById = async function (productId) {
    try {
        const product = await this.findById(productId).exec();
        console.log(`Fetched product with id ${productId} from database`);
        return product;
    } catch (err) {
        console.error(err);
        throw new Error(`Error fetching product with id ${productId} from database`);
    }
};

productSchema.statics.updateProductById = async function (productId, productData) {
    try {
        productData.updatedAt = Date.now();
        const product = await this.findByIdAndUpdate(productId, productData, { new: true }).exec();
        console.log(`Updated product with id ${productId}`);
        return product;
    } catch (err) {
        console.error(err);
        throw new Error(`Error updating product with id ${productId}`);
    }
};

productSchema.statics.deleteProductById = async function (productId) {
    try {
        const product = await this.findByIdAndDelete(productId).exec();
        console.log(`Deleted product with id ${productId}`);
        return product;
    } catch (err) {
        console.error(err);
        throw new Error(`Error deleting product with id ${productId}`);
    }
};

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;