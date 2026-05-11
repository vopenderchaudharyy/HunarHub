const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  deliveryTime: { type: String, default: '2-3 days' },
  images: [String]
});

const sellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Cobbler', 'Potter', 'Tailor', 'Artisan', 'Small Vendor', 'Carpenter', 'Bangles Maker', 'Embroidery', 'Painter', 'Weaver', 'Other']
  },
  subCategory: String,
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  services: [serviceSchema],
  skills: [String],
  experience: {
    type: Number,
    default: 0
  },
  location: {
    address: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: String
  },
  images: [String],
  profileImage: String,
  idProof: {
    type: String,
    required: [true, 'ID proof is required'],
    enum: ['Aadhaar', 'PAN', 'Voter ID']
  },
  idNumber: { type: String, required: true },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    bankName: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  totalOrders: { type: Number, default: 0 },
  startingPrice: { type: Number, default: 0 },
  tags: [String],
  featured: { type: Boolean, default: false }
}, { timestamps: true });

// Index for search
sellerSchema.index({ 'location.city': 1, category: 1, 'rating.average': -1 });
sellerSchema.index({ businessName: 'text', description: 'text', skills: 'text' });

module.exports = mongoose.model('Seller', sellerSchema);
