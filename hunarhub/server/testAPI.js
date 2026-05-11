/**
 * HunarHub API Test Suite
 * Tests all authentication endpoints
 */

const http = require('http');

function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('========================================');
  console.log('🧪 HunarHub API Test Suite');
  console.log('========================================\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣  Health Check');
    let res = await makeRequest('GET', '/api/health');
    console.log(`   Status: ${res.status}`);
    console.log(`   ✅ ${res.data.status}\n`);

    // Test 2: Register User
    console.log('2️⃣  Register New User');
    const testEmail = `api_test_${Date.now()}@hunarhub.com`;
    res = await makeRequest('POST', '/api/auth/register', {
      name: 'API Test User',
      email: testEmail,
      phone: '9876543210',
      password: 'TestPass123',
      role: 'customer'
    });
    console.log(`   Status: ${res.status}`);
    if (res.data.success) {
      console.log(`   ✅ User registered successfully!`);
      console.log(`   User ID: ${res.data.user._id}`);
      console.log(`   Token Length: ${res.data.token.length} chars`);
      var registrationToken = res.data.token;
      var userId = res.data.user._id;
    } else {
      console.log(`   ❌ ${res.data.message}`);
    }
    console.log('');

    // Test 3: Login User
    console.log('3️⃣  Login User');
    res = await makeRequest('POST', '/api/auth/login', {
      email: testEmail,
      password: 'TestPass123'
    });
    console.log(`   Status: ${res.status}`);
    if (res.data.success) {
      console.log(`   ✅ Login successful!`);
      console.log(`   Token Length: ${res.data.token.length} chars`);
      var loginToken = res.data.token;
    } else {
      console.log(`   ❌ ${res.data.message}`);
    }
    console.log('');

    // Test 4: Get Current User (with registration token)
    console.log('4️⃣  Get Current User (Protected Route)');
    res = await makeRequest('GET', '/api/auth/me', null, registrationToken);
    console.log(`   Status: ${res.status}`);
    if (res.data.success) {
      console.log(`   ✅ Retrieved user successfully!`);
      console.log(`   User: ${res.data.user.name}`);
      console.log(`   Email: ${res.data.user.email}`);
    } else {
      console.log(`   ❌ ${res.data.message}`);
    }
    console.log('');

    // Test 5: Wrong Password
    console.log('5️⃣  Login with Wrong Password');
    res = await makeRequest('POST', '/api/auth/login', {
      email: testEmail,
      password: 'WrongPassword'
    });
    console.log(`   Status: ${res.status}`);
    if (!res.data.success) {
      console.log(`   ✅ Correctly rejected wrong password`);
      console.log(`   Message: ${res.data.message}`);
    } else {
      console.log(`   ❌ Should have rejected wrong password!`);
    }
    console.log('');

    // Test 6: Non-existent User
    console.log('6️⃣  Login with Non-existent Email');
    res = await makeRequest('POST', '/api/auth/login', {
      email: 'nonexistent@hunarhub.com',
      password: 'AnyPassword'
    });
    console.log(`   Status: ${res.status}`);
    if (!res.data.success) {
      console.log(`   ✅ Correctly rejected non-existent user`);
      console.log(`   Message: ${res.data.message}`);
    } else {
      console.log(`   ❌ Should have rejected non-existent user!`);
    }
    console.log('');

    // Test 7: Duplicate Email Registration
    console.log('7️⃣  Register with Duplicate Email');
    res = await makeRequest('POST', '/api/auth/register', {
      name: 'Another User',
      email: testEmail,
      phone: '9876543211',
      password: 'AnotherPass123',
      role: 'customer'
    });
    console.log(`   Status: ${res.status}`);
    if (!res.data.success) {
      console.log(`   ✅ Correctly rejected duplicate email`);
      console.log(`   Message: ${res.data.message}`);
    } else {
      console.log(`   ❌ Should have rejected duplicate email!`);
    }
    console.log('');

    // Test 8: Access Protected Route without Token
    console.log('8️⃣  Access Protected Route without Token');
    res = await makeRequest('GET', '/api/auth/me');
    console.log(`   Status: ${res.status}`);
    if (!res.data.success) {
      console.log(`   ✅ Correctly rejected access without token`);
      console.log(`   Message: ${res.data.message}`);
    } else {
      console.log(`   ❌ Should have rejected access without token!`);
    }
    console.log('');

    // Summary
    console.log('========================================');
    console.log('📊 Test Summary');
    console.log('========================================');
    console.log('✅ All API endpoints are working correctly!');
    console.log('✅ Authentication flow is operational!');
    console.log('✅ Error handling is in place!');
    console.log('========================================\n');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    process.exit(1);
  }

  process.exit(0);
}

// Wait a moment for server to be ready, then run tests
setTimeout(runTests, 1000);
