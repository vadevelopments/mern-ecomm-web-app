const Cart = require('../models/cart');
const User = require('../models/User');
const Product = require('../models/Product');

// Controller function to add a product to the cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Fetch the cart for the specified user
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // If the cart doesn't exist, create a new cart
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity }],
                totalItems: quantity,
            });
        } else {
            // If the cart already exists, update the products array and total items
            const existingProductIndex = cart.products.findIndex(
                (product) => product.product.toString() === productId
            );

            if (existingProductIndex !== -1) {
                // If the product is already in the cart, update the quantity
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                // If the product is not in the cart, add it to the products array
                cart.products.push({ product: productId, quantity });
            }

            cart.totalItems += quantity;
        }

        // Update the totalPrice based on the product prices
        const products = await Product.find({ _id: { $in: cart.products.map((p) => p.product) } });
        cart.totalPrice = products.reduce(
            (total, product) =>
                total +
                product.price *
                    cart.products.find((p) => p.product.toString() === product._id.toString()).quantity,
            0
        );

        await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
};

// Controller function to update the quantity of a product in the cart
const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
    
        if (typeof quantity !== 'number') {
            return res.status(500).json({ error: 'Failed to update product quantity' });
        }
    
        const cart = await Cart.findOne({ user: userId });
    
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
    
        const productIndex = cart.products.findIndex(
            (product) => product.product.toString() === productId
        );
    
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }
    
        const existingQuantity = cart.products[productIndex].quantity;
    
        if (quantity === 0) {
            // If the new quantity is zero, remove the product from the cart
            cart.products.splice(productIndex, 1);
        } else {
            // Update the quantity
            cart.products[productIndex].quantity = quantity;
        }
    
        // Update the totalItems and totalPrice
        cart.totalItems += (quantity - existingQuantity);
        const products = await Product.find({ _id: { $in: cart.products.map((p) => p.product) } });

        cart.totalPrice = products.reduce(
            (total, product) =>
            total +
            product.price *
                cart.products.find((p) => p.product.toString() === product._id.toString()).quantity,
            0
        );
    
        await cart.save();
    
        res.status(200).json({ message: 'Product quantity updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product quantity' });
    }
};
 

// Retrieves all carts associated with a specific user ID
const getAllCartsByUserId = async (req, res) => {
    try {
        // const { userId } = req.params;
        const { userId } = req.body;
        // console.log(req.body);

        const carts = await Cart.find({ user: userId });

        res.status(200).json({ carts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch carts' });
    }
};

module.exports = { addToCart, updateQuantity , getAllCartsByUserId };