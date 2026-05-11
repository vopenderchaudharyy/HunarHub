const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  service: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryTime: String
  },
  customerDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: String
  },
  message: String,
  preferredDate: Date,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'upi', 'card', 'netbanking'],
    default: 'cash'
  },
  notes: String,
  completedAt: Date,
  cancelledAt: Date,
  cancelReason: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
