const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/review/reviews
// @desc    Create a review of a product
// @access  Private
router.post('/reviews', authMiddleware, reviewController.createReview);

// @route   GET api/review/reviews/:productId
// @desc    Get all reviews by product ID
// @access  Public
router.get('/reviews/:productId', reviewController.getReviewsByProduct);

module.exports = router;