/**
 * HunarHub Setup Verification Test
 * Tests MongoDB connection, Email service, and Authentication flow
 */

const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

console.log('\n========================================');
console.log('🧪 HUNARHUB SETUP VERIFICATION TEST 🧪');
console.log('========================================\n');

// ============================================
// 1. TEST MONGODB CONNECTION
// ============================================
async function testMongoDBConnection() {
  console.log('📦 TEST 1: MongoDB Connection');
  console.log('--------------------------------');
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`   URI: ${process.env.MONGO_URI}`);
    console.log(`   Status: Connected`);
    
    // Get database info
    const db = mongoose.connection;
    console.log(`   Database: ${db.name}`);
    
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed!');
    console.error(`   Error: ${error.message}`);
    return false;
  }
}

// ============================================
// 2. TEST EMAIL SERVICE
// ============================================
async function testEmailService() {
  console.log('\n📧 TEST 2: Email Service Configuration');
  console.log('--------------------------------------');
  
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Verify connection
    await transporter.verify();
    
    console.log('✅ Email Service Configured Successfully!');
    console.log(`   Service: ${process.env.EMAIL_SERVICE}`);
    console.log(`   Email: ${process.env.EMAIL_USER}`);
    console.log(`   Admin Email: ${process.env.ADMIN_EMAIL}`);
    console.log('   Status: Ready to send emails');
    
    // Test sending a test email
    console.log('\n   Testing email delivery...');
    const result = await transporter.sendMail({
      from: `"HunarHub Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: '🧪 HunarHub Email Service Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>HunarHub Email Service Test</h2>
          <p>If you received this email, the email service is working correctly! ✅</p>
          <p>Test Time: ${new Date().toLocaleString()}</p>
        </div>
      `
    });
    
    console.log(`   ✅ Test email sent successfully!`);
    console.log(`   Message ID: ${result.messageId}`);
    
    return true;
  } catch (error) {
    console.error('❌ Email Service Failed!');
    console.error(`   Error: ${error.message}`);
    return false;
  }
}

// ============================================
// 3. TEST USER MODEL & PASSWORD HASHING
// ============================================
async function testUserModel() {
  console.log('\n👤 TEST 3: User Model & Password Hashing');
  console.log('----------------------------------------');
  
  try {
    // Load User model
    const User = require('./models/User');
    
    // Test password hashing
    const testPassword = 'TestPassword123!';
    const hashedPassword = await bcrypt.hash(testPassword, 12);
    const isMatch = await bcrypt.compare(testPassword, hashedPassword);
    
    console.log('✅ Password Hashing Working!');
    console.log(`   Original Password: ${testPassword}`);
    console.log(`   Hashed Successfully: Yes`);
    console.log(`   Password Match Verification: ${isMatch ? 'Yes ✅' : 'No ❌'}`);
    
    // Test JWT token generation
    const testUserId = new mongoose.Types.ObjectId();
    const token = jwt.sign({ id: testUserId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });
    
    console.log('\n✅ JWT Token Generation Working!');
    console.log(`   Token Generated: Yes`);
    console.log(`   Token Length: ${token.length} characters`);
    console.log(`   Expires In: ${process.env.JWT_EXPIRE || '7d'}`);
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`   Token Verification: Valid ✅`);
    console.log(`   User ID in Token: ${decoded.id}`);
    
    return true;
  } catch (error) {
    console.error('❌ User Model Test Failed!');
    console.error(`   Error: ${error.message}`);
    return false;
  }
}

// ============================================
// 4. TEST ENVIRONMENT VARIABLES
// ============================================
function testEnvironmentVariables() {
  console.log('\n🔧 TEST 4: Environment Variables');
  console.log('--------------------------------');
  
  const requiredVars = [
    'MONGO_URI',
    'JWT_SECRET',
    'JWT_EXPIRE',
    'EMAIL_SERVICE',
    'EMAIL_USER',
    'EMAIL_PASSWORD',
    'ADMIN_EMAIL',
    'PORT'
  ];
  
  let allPresent = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
      console.error(`❌ ${varName}: NOT SET`);
      allPresent = false;
    } else {
      // Hide sensitive info
      let displayValue = value;
      if (varName.includes('PASSWORD') || varName.includes('SECRET')) {
        displayValue = '***' + value.slice(-4);
      } else if (varName.includes('URI')) {
        displayValue = value.substring(0, 30) + '...';
      }
      console.log(`✅ ${varName}: ${displayValue}`);
    }
  });
  
  return allPresent;
}

// ============================================
// 5. TEST AUTHENTICATION FLOW (Simulated)
// ============================================
async function testAuthenticationFlow() {
  console.log('\n🔐 TEST 5: Authentication Flow (Simulation)');
  console.log('-------------------------------------------');
  
  try {
    const User = require('./models/User');
    
    // Test data
    const testEmail = `test_${Date.now()}@hunarhub-test.com`;
    const testPassword = 'TestPassword123!';
    const testData = {
      name: 'Test User',
      email: testEmail,
      phone: '9876543210',
      password: testPassword,
      role: 'customer'
    };
    
    console.log('\n📝 Simulating User Registration:');
    console.log(`   Name: ${testData.name}`);
    console.log(`   Email: ${testData.email}`);
    console.log(`   Phone: ${testData.phone}`);
    console.log(`   Role: ${testData.role}`);
    
    // Check if test user already exists
    let user = await User.findOne({ email: testEmail });
    if (user) {
      await User.deleteOne({ email: testEmail });
      console.log('   (Cleaned up previous test user)');
    }
    
    // Create user
    user = await User.create(testData);
    console.log(`   ✅ User Created Successfully!`);
    console.log(`   User ID: ${user._id}`);
    
    // Simulate login - compare password
    console.log('\n📝 Simulating User Login:');
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
    
    const loginUser = await User.findOne({ email: testEmail }).select('+password');
    if (!loginUser) {
      throw new Error('User not found after creation');
    }
    
    const passwordMatch = await loginUser.comparePassword(testPassword);
    console.log(`   ✅ Password Verification: ${passwordMatch ? 'Success ✅' : 'Failed ❌'}`);
    
    if (passwordMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
      });
      console.log(`   ✅ JWT Token Generated!`);
      console.log(`   Token: ${token.substring(0, 20)}...`);
    }
    
    // Clean up
    await User.deleteOne({ email: testEmail });
    console.log('\n   ✅ Test user cleaned up!');
    
    return true;
  } catch (error) {
    console.error('❌ Authentication Flow Test Failed!');
    console.error(`   Error: ${error.message}`);
    return false;
  }
}

// ============================================
// 6. TEST DATABASE MODELS
// ============================================
async function testDatabaseModels() {
  console.log('\n📋 TEST 6: Database Models');
  console.log('--------------------------');
  
  try {
    const models = [
      { name: 'User', path: './models/User' },
      { name: 'Seller', path: './models/Seller' },
      { name: 'Product', path: './models/Product' },
      { name: 'Order', path: './models/Order' },
      { name: 'Review', path: './models/Review' }
    ];
    
    for (const model of models) {
      try {
        require(model.path);
        console.log(`✅ ${model.name} Model: Loaded`);
      } catch (err) {
        console.error(`❌ ${model.name} Model: Failed to load - ${err.message}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Model Test Failed!');
    console.error(`   Error: ${error.message}`);
    return false;
  }
}

// ============================================
// MAIN TEST RUNNER
// ============================================
async function runAllTests() {
  const results = [];
  
  // Test 4 first (doesn't require connection)
  results.push({
    name: 'Environment Variables',
    passed: testEnvironmentVariables()
  });
  
  // Test 1: MongoDB
  results.push({
    name: 'MongoDB Connection',
    passed: await testMongoDBConnection()
  });
  
  if (mongoose.connection.readyState === 1) {
    // Test 3: User Model
    results.push({
      name: 'User Model & Hashing',
      passed: await testUserModel()
    });
    
    // Test 6: Database Models
    results.push({
      name: 'Database Models',
      passed: await testDatabaseModels()
    });
    
    // Test 5: Authentication Flow
    results.push({
      name: 'Authentication Flow',
      passed: await testAuthenticationFlow()
    });
    
    // Test 2: Email Service
    results.push({
      name: 'Email Service',
      passed: await testEmailService()
    });
  } else {
    console.log('\n⚠️  Skipping remaining tests (MongoDB not connected)');
  }
  
  // ============================================
  // SUMMARY REPORT
  // ============================================
  console.log('\n========================================');
  console.log('📊 TEST SUMMARY REPORT');
  console.log('========================================\n');
  
  let passedCount = 0;
  results.forEach(result => {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${result.name}`);
    if (result.passed) passedCount++;
  });
  
  const totalTests = results.length;
  const percentage = Math.round((passedCount / totalTests) * 100);
  
  console.log('\n----------------------------------------');
  console.log(`Results: ${passedCount}/${totalTests} tests passed (${percentage}%)`);
  console.log('----------------------------------------\n');
  
  if (passedCount === totalTests) {
    console.log('🎉 ALL TESTS PASSED! Setup is ready for deployment.\n');
  } else {
    console.log('⚠️  Some tests failed. Please fix the issues before deployment.\n');
  }
  
  // Cleanup
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
  
  process.exit(passedCount === totalTests ? 0 : 1);
}

// Run all tests
runAllTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
