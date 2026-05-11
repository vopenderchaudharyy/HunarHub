const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Seller = require('./models/Seller');
const Review = require('./models/Review');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Seller.deleteMany({});
    await Review.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Users
    const users = await User.create([
      { name: 'Rajesh Kumar', email: 'rajesh@hunarhub.com', phone: '9876543210', password: 'password123', role: 'seller' },
      { name: 'Sushila Kumari', email: 'sushila@hunarhub.com', phone: '9876543211', password: 'password123', role: 'seller' },
      { name: 'Imran Tailor', email: 'imran@hunarhub.com', phone: '9876543212', password: 'password123', role: 'seller' },
      { name: 'Arvind Artisan', email: 'arvind@hunarhub.com', phone: '9876543213', password: 'password123', role: 'seller' },
      { name: 'Mohit Verma', email: 'mohit@hunarhub.com', phone: '9876543214', password: 'password123', role: 'seller' },
      { name: 'Test Customer', email: 'customer@hunarhub.com', phone: '9876543215', password: 'password123', role: 'customer' },
    ]);
    console.log('👤 Created', users.length, 'users');

    // Create Seller Profiles
    const sellers = await Seller.create([
      {
        user: users[0]._id,
        businessName: 'Rajesh Cobbler Works',
        category: 'Cobbler',
        description: 'Professional cobbler with 15+ years of experience. Expert in shoe repair, leather work, and custom shoe polishing.',
        skills: ['Shoe Repair', 'Leather Work', 'Sole Replacement', 'Shoe Polishing'],
        experience: 15,
        location: { city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226001', address: 'Hazratganj Market' },
        services: [
          { name: 'Basic Shoe Repair', price: 150, deliveryTime: '1-2 days' },
          { name: 'Leather Sole Replacement', price: 299, deliveryTime: '2-3 days' },
          { name: 'Full Shoe Restoration', price: 599, deliveryTime: '3-5 days' },
          { name: 'Custom Shoe Polishing', price: 99, deliveryTime: 'Same day' },
        ],
        idProof: 'Aadhaar',
        idNumber: 'XXXX-XXXX-1234',
        startingPrice: 99,
        rating: { average: 4.8, count: 124 },
        totalOrders: 450,
        isVerified: true,
        featured: true,
        tags: ['cobbler', 'shoe repair', 'leather', 'lucknow'],
      },
      {
        user: users[1]._id,
        businessName: 'Sushila Pottery Art',
        category: 'Potter',
        description: 'Skilled pottery artist with 20+ years of experience. Beautiful handmade pots, planters, and terracotta art.',
        skills: ['Clay Pots', 'Terracotta', 'Handpainted Pottery', 'Custom Designs'],
        experience: 20,
        location: { city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226002' },
        services: [
          { name: 'Custom Clay Pot', price: 349, deliveryTime: '3-5 days' },
          { name: 'Terracotta Planter Set', price: 699, deliveryTime: '5-7 days' },
          { name: 'Decorative Vase', price: 499, deliveryTime: '4-6 days' },
        ],
        idProof: 'Voter ID',
        idNumber: 'ABC1234567',
        startingPrice: 349,
        rating: { average: 4.7, count: 98 },
        totalOrders: 320,
        isVerified: true,
        featured: true,
        tags: ['potter', 'pottery', 'clay', 'terracotta', 'lucknow'],
      },
      {
        user: users[2]._id,
        businessName: 'Imran Tailoring House',
        category: 'Tailor',
        description: "Expert tailor with specialization in men's and women's wear. Premium stitching and alterations.",
        skills: ["Men's Wear", "Women's Wear", 'Alterations', 'Custom Stitching'],
        experience: 12,
        location: { city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226003' },
        services: [
          { name: "Men's Shirt Stitching", price: 299, deliveryTime: '3-4 days' },
          { name: "Women's Suit Stitching", price: 499, deliveryTime: '4-5 days' },
          { name: 'Alteration & Fitting', price: 199, deliveryTime: '1-2 days' },
        ],
        idProof: 'PAN',
        idNumber: 'ABCDE1234F',
        startingPrice: 199,
        rating: { average: 4.6, count: 76 },
        totalOrders: 280,
        isVerified: true,
        featured: true,
        tags: ['tailor', 'stitching', 'alteration', 'lucknow'],
      },
      {
        user: users[3]._id,
        businessName: 'Arvind Handicrafts',
        category: 'Artisan',
        description: 'Master artisan specializing in wood carving, traditional handicrafts, and decorative art pieces.',
        skills: ['Wood Carving', 'Handicrafts', 'Wall Art', 'Custom Designs'],
        experience: 18,
        location: { city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226004' },
        services: [
          { name: 'Custom Wood Carving', price: 999, deliveryTime: '7-10 days' },
          { name: 'Wall Art Piece', price: 799, deliveryTime: '5-7 days' },
        ],
        idProof: 'Aadhaar',
        idNumber: 'XXXX-XXXX-5678',
        startingPrice: 799,
        rating: { average: 4.9, count: 110 },
        totalOrders: 200,
        isVerified: true,
        featured: true,
        tags: ['artisan', 'wood carving', 'handicraft', 'lucknow'],
      },
    ]);

    console.log('🏪 Created', sellers.length, 'seller profiles');

    // Create Reviews
    await Review.create([
      { reviewer: users[5]._id, seller: sellers[0]._id, rating: 5, title: 'Excellent!', comment: 'Very professional work. Shoes look brand new!', isVerified: true },
      { reviewer: users[5]._id, seller: sellers[1]._id, rating: 5, title: 'Beautiful pottery', comment: 'The handpainted pot is gorgeous. Great craftsmanship!', isVerified: true },
    ]);

    console.log('⭐ Created sample reviews');
    console.log('\n🎉 Seed data created successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('   Customer: customer@hunarhub.com / password123');
    console.log('   Seller:   rajesh@hunarhub.com / password123');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
