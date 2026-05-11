const Review = require('../models/Review');
const Order = require('../models/Order');

// @desc    Add review
// @route   POST /api/reviews
// @access  Private
const addReview = async (req, res) => {
  try {
    const { sellerId, orderId, rating, title, comment } = req.body;

    // Check if already reviewed
    const existing = await Review.findOne({ reviewer: req.user._id, seller: sellerId, order: orderId });
    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this order' });
    }

    const review = await Review.create({
      reviewer: req.user._id,
      seller: sellerId,
      order: orderId,
      rating,
      title,
      comment
    });

    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get seller reviews
// @route   GET /api/reviews/seller/:sellerId
// @access  Public
const getSellerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ seller: req.params.sellerId })
      .populate('reviewer', 'name avatar')
      .sort('-createdAt');

    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addReview, getSellerReviews };
