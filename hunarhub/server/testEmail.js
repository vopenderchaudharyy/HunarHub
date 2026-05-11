/**
 * Quick Email Test
 */
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

async function testEmail() {
  console.log('Testing email service...\n');
  
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  try {
    // Verify connection with timeout
    await Promise.race([
      transporter.verify(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email verification timeout')), 10000)
      )
    ]);
    
    console.log('✅ Email service is configured correctly!');
    console.log(`   Service: ${process.env.EMAIL_SERVICE}`);
    console.log(`   Email: ${process.env.EMAIL_USER}`);
    
    // Try sending an email with timeout
    console.log('\n📤 Sending test email...');
    
    const result = await Promise.race([
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: '🧪 HunarHub Email Test',
        html: '<p>Email service is working! ✅</p>'
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout')), 15000)
      )
    ]);
    
    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${result.messageId}\n`);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
  }
  
  process.exit(0);
}

testEmail();
