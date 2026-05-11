const Seller = require('../models/Seller');
const User = require('../models/User');

// @desc    Get all sellers with filters
// @route   GET /api/sellers
// @access  Public
const getSellers = async (req, res) => {
  try {
    const {
      category, city, minRating, maxPrice, search,
      page = 1, limit = 10, sort = '-rating.average'
    } = req.query;

    const query = { isActive: true, isVerified: true };

    if (category && category !== 'All') query.category = category;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (minRating) query['rating.average'] = { $gte: Number(minRating) };
    if (maxPrice) query.startingPrice = { $lte: Number(maxPrice) };
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const sellers = await Seller.find(query)
      .populate('user', 'name email phone avatar')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Seller.countDocuments(query);

    res.json({
      success: true,
      count: sellers.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      sellers
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single seller
// @route   GET /api/sellers/:id
// @access  Public
const getSeller = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id)
      .populate('user', 'name email phone avatar createdAt');

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.json({ success: true, seller });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create seller profile
// @route   POST /api/sellers
// @access  Private (seller only)
const createSellerProfile = async (req, res) => {
  try {
    // Check if seller profile already exists
    const existing = await Seller.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'Seller profile already exists' });
    }

    const sellerData = { ...req.body, user: req.user._id };

    // Set starting price from services
    if (sellerData.services && sellerData.services.length > 0) {
      sellerData.startingPrice = Math.min(...sellerData.services.map(s => s.price));
    }

    const seller = await Seller.create(sellerData);

    // Update user role to seller
    await User.findByIdAndUpdate(req.user._id, { role: 'seller' });

    res.status(201).json({ success: true, seller });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update seller profile
// @route   PUT /api/sellers/:id
// @access  Private
const updateSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findOne({ _id: req.params.id, user: req.user._id });
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found or unauthorized' });
    }

    if (req.body.services && req.body.services.length > 0) {
      req.body.startingPrice = Math.min(...req.body.services.map(s => s.price));
    }

    const updated = await Seller.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email phone');

    res.json({ success: true, seller: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get featured sellers
// @route   GET /api/sellers/featured
// @access  Public
const getFeaturedSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({ isVerified: true, isActive: true, featured: true })
      .populate('user', 'name avatar')
      .sort('-rating.average')
      .limit(8);

    res.json({ success: true, sellers });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get seller by user
// @route   GET /api/sellers/my-profile
// @access  Private
const getMySellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });
    if (!seller) {
      return res.status(404).json({ message: 'Seller profile not found' });
    }
    res.json({ success: true, seller });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSellers, getSeller, createSellerProfile, updateSellerProfile, getFeaturedSellers, getMySellerProfile };
