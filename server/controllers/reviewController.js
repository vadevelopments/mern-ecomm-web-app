const Review = require('../models/Review');

// Controller to create a new review
exports.createReview = async (req, res) => {
    try {
        const { user, product, rating, comment } = req.body;

        // Create a new review instance
        const review = new Review({
            user,
            product,
            rating,
            comment,
        });
        
        // Save the review to the database
        const savedReview = await review.save();

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the review' });
    }
};

// Controller to fetch reviews by product
exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find all reviews for the given product
        const reviews = await Review.find({ product: productId });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the reviews' });
    }
};