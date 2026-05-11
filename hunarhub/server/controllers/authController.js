const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Seller = require('../models/Seller');
const { sendSignupConfirmationEmail, sendAdminSignupNotification, sendAdminLoginNotification } = require('../utils/emailService');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user
    const user = await User.create({ name, email, phone, password, role: role || 'customer' });

    // Send confirmation email to user
    sendSignupConfirmationEmail(user.name, user.email).catch(err => console.error(err));

    // Send admin notification
    sendAdminSignupNotification(user.name, user.email, user.phone, user.role).catch(err => console.error(err));

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Send admin login notification
    sendAdminLoginNotification(user.name, user.email, user.role).catch(err => console.error(err));

    // Check if seller profile exists
    let sellerProfile = null;
    if (user.role === 'seller') {
      sellerProfile = await Seller.findOne({ user: user._id }).select('_id businessName category isVerified');
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        sellerProfile
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let sellerProfile = null;

    if (user.role === 'seller') {
      sellerProfile = await Seller.findOne({ user: user._id });
    }

    res.json({ success: true, user, sellerProfile });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/update
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, phone, location } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (location) updateData.location = location;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, getMe, updateProfile, changePassword };
