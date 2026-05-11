const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  discountPrice: Number,
  category: {
    type: String,
    required: true
  },
  images: [String],
  stock: {
    type: Number,
    default: 10
  },
  unit: {
    type: String,
    default: 'piece'
  },
  tags: [String],
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  totalSold: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
