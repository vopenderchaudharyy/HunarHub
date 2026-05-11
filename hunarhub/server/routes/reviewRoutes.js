const express = require('express');
const router = express.Router();
const { addReview, getSellerReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addReview);
router.get('/seller/:sellerId', getSellerReviews);

module.exports = router;
