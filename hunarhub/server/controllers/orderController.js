const Order = require('../models/Order');
const Seller = require('../models/Seller');

// @desc    Create new order/request
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { sellerId, service, customerDetails, message, preferredDate, paymentMethod } = req.body;

    const seller = await Seller.findById(sellerId);
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    const order = await Order.create({
      customer: req.user._id,
      seller: sellerId,
      service,
      customerDetails,
      message,
      preferredDate,
      totalAmount: service.price,
      paymentMethod: paymentMethod || 'cash'
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get customer orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate({ path: 'seller', select: 'businessName category location profileImage', populate: { path: 'user', select: 'name phone' } })
      .sort('-createdAt');

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get seller orders
// @route   GET /api/orders/seller-orders
// @access  Private (seller)
const getSellerOrders = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });
    if (!seller) return res.status(404).json({ message: 'Seller profile not found' });

    const { status } = req.query;
    const query = { seller: seller._id };
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('customer', 'name phone email avatar')
      .sort('-createdAt');

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const { status, cancelReason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const seller = await Seller.findOne({ user: req.user._id });

    // Only seller or customer can update (with restrictions)
    const isSeller = seller && order.seller.toString() === seller._id.toString();
    const isCustomer = order.customer.toString() === req.user._id.toString();

    if (!isSeller && !isCustomer) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = status;
    if (status === 'completed') order.completedAt = new Date();
    if (status === 'cancelled') {
      order.cancelledAt = new Date();
      order.cancelReason = cancelReason;
    }

    await order.save();

    // Update seller total orders if completed
    if (status === 'completed') {
      await Seller.findByIdAndUpdate(order.seller, { $inc: { totalOrders: 1 } });
    }

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name phone email')
      .populate({ path: 'seller', populate: { path: 'user', select: 'name phone' } });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder, getMyOrders, getSellerOrders, updateOrderStatus, getOrder };
