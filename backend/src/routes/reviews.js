const express = require('express');
const router = express.Router();

const { getProductReviews, submitReview } = require('../controllers/reviewController');

// All approved reviews for a product
router.get('/product/:productId', getProductReviews);

// Submit a new review (pending approval)
router.post('/', submitReview);

module.exports = router;
