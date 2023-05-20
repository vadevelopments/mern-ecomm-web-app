const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');

const cartSchema = new mongoose.Schema(
{
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	products: [
	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	],
	totalItems: {
		type: Number,
		default: 0,
	},
	totalPrice: {
		type: Number,
		default: 0,
	},
},
{
	timestamps: true,
}
);

const Cart = mongoose.model('Cart', cartSchema, 'carts');

module.exports = Cart;