const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  title: String,
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  images: [String],
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

// One review per order
reviewSchema.index({ reviewer: 1, seller: 1, order: 1 }, { unique: true });

// Update seller rating after review
reviewSchema.post('save', async function() {
  const Seller = mongoose.model('Seller');
  const Review = mongoose.model('Review');

  const stats = await Review.aggregate([
    { $match: { seller: this.seller } },
    { $group: { _id: '$seller', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);

  if (stats.length > 0) {
    await Seller.findByIdAndUpdate(this.seller, {
      'rating.average': Math.round(stats[0].avgRating * 10) / 10,
      'rating.count': stats[0].count
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
