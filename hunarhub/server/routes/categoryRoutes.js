const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

// @desc    Get all categories with seller counts
// @route   GET /api/categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Seller.aggregate([
      { $match: { isVerified: true, isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 }, avgRating: { $avg: '$rating.average' } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
