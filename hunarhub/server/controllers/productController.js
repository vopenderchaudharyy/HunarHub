const Product = require('../models/Product');
const Seller = require('../models/Seller');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, page = 1, limit = 12, sort = '-createdAt' } = req.query;

    const query = { isAvailable: true };
    if (category) query.category = category;
    if (search) query.$text = { $search: search };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(query)
      .populate({ path: 'seller', select: 'businessName location', populate: { path: 'user', select: 'name' } })
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({ success: true, products, total, totalPages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private (seller)
const createProduct = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });
    if (!seller) return res.status(404).json({ message: 'Seller profile not found' });

    const product = await Product.create({ ...req.body, seller: seller._id });
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get seller products
// @route   GET /api/products/my-products
// @access  Private
const getMyProducts = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });
    if (!seller) return res.status(404).json({ message: 'Seller profile not found' });

    const products = await Product.find({ seller: seller._id }).sort('-createdAt');
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });
    const product = await Product.findOne({ _id: req.params.id, seller: seller._id });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });
    const product = await Product.findOneAndDelete({ _id: req.params.id, seller: seller._id });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProducts, createProduct, getMyProducts, updateProduct, deleteProduct };
