const dotenv = require('dotenv');
const paypal = require('paypal-rest-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order');

paypal.configure({
    mode: 'sandbox', // Use 'sandbox' for testing or 'live' for production
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET_KEY,
});

// Controller function to create a new order
const createOrder = async (req, res) => {
    try {
        const { user, products, shippingAddress, paymentMethod, totalPrice } = req.body;

        // Create a new order
        const order = new Order({
            user,
            products,
            shippingAddress,
            paymentMethod,
            totalPrice,
        });

        // Save the order
        await order.save();

        if (paymentMethod === 'paypal') {
            // Create a PayPal payment
            const createPaymentJson = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal',
                },
                redirect_urls: {
                    return_url: 'http://your-return-url.com',
                    cancel_url: 'http://your-cancel-url.com',
                },
                transactions: [
                    {
                        amount: {
                            total: totalPrice.toString(),
                            currency: 'USD', // Change to your desired currency
                        },
                        description: 'Payment for Order',
                    },
                ],
            };

            paypal.payment.create(createPaymentJson, function (error, payment) {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Failed to create PayPal payment' });
                } else {
                    // Redirect the user to the PayPal payment approval URL
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.status(201).json({ order, approvalUrl: payment.links[i].href });
                        }
                    }
                }
            });
        } else if (paymentMethod === 'stripe') {
            // Create a payment intent with Stripe
            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalPrice * 100, // Stripe requires the amount in cents
                currency: 'usd', // Change to your desired currency
                payment_method_types: ['card'], // Specify the accepted payment method types
                metadata: { orderId: order._id }, // Optional: Attach metadata for reference
            });

            // Send the client secret to the client-side to complete the payment
            res.status(201).json({ order, clientSecret: paymentIntent.client_secret });
        } else {
            // Handle unsupported payment method
            res.status(400).json({ error: 'Unsupported payment method' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};


// Controller function to get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

module.exports = { createOrder, getAllOrders };