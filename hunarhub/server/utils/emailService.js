const nodemailer = require('nodemailer');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send signup confirmation email to user
const sendSignupConfirmationEmail = async (userName, userEmail) => {
  try {
    const mailOptions = {
      from: `"HunarHub Team" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '✅ Welcome to HunarHub - Confirm Your Signup',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #E8580A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
            <h1 style="margin: 0;">Welcome to HunarHub! 🎉</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Hi <strong>${userName}</strong>,</p>
            <p>Thank you for signing up with HunarHub! We're excited to have you on board.</p>
            <p>Your account has been successfully created and is ready to use.</p>
            
            <div style="background-color: white; padding: 15px; border-left: 4px solid #E8580A; margin: 20px 0;">
              <p><strong>Account Details:</strong></p>
              <p>Email: ${userEmail}</p>
              <p>Status: ✅ Active</p>
            </div>
            
            <p><strong>What's next?</strong></p>
            <ul>
              <li>Complete your profile</li>
              <li>Explore available services</li>
              <li>Connect with skilled professionals</li>
            </ul>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              Best regards,<br>
              <strong>The HunarHub Team</strong><br>
              Local Skills, Global Impact
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Signup confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error('❌ Error sending signup confirmation email:', error.message);
  }
};

// Send admin notification email for new signup
const sendAdminSignupNotification = async (userName, userEmail, userPhone, userRole) => {
  try {
    const mailOptions = {
      from: `"HunarHub System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🆕 New User Signup - ${userName} (${userRole})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #333; color: white; padding: 15px; text-align: center;">
            <h2>New User Registration Alert</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p><strong>New ${userRole} has signed up on HunarHub!</strong></p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background-color: #E8580A; color: white;">
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Field</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Details</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Name</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${userName}</td>
              </tr>
              <tr style="background-color: #f0f0f0;">
                <td style="padding: 10px; border: 1px solid #ddd;">Email</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${userEmail}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Phone</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${userPhone || 'Not provided'}</td>
              </tr>
              <tr style="background-color: #f0f0f0;">
                <td style="padding: 10px; border: 1px solid #ddd;">Role</td>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>${userRole}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Signup Time</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
            
            <p style="color: #666; font-size: 12px;">
              This is an automated notification. Please review new user registrations periodically.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Admin signup notification sent to ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    console.error('❌ Error sending admin notification:', error.message);
  }
};

// Send login notification email to admin
const sendAdminLoginNotification = async (userName, userEmail, userRole) => {
  try {
    const mailOptions = {
      from: `"HunarHub System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `👤 User Login - ${userName} (${userRole})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #333; color: white; padding: 15px; text-align: center;">
            <h2>User Login Alert</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p><strong>A user has logged into HunarHub</strong></p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background-color: #E8580A; color: white;">
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Field</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Details</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Name</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${userName}</td>
              </tr>
              <tr style="background-color: #f0f0f0;">
                <td style="padding: 10px; border: 1px solid #ddd;">Email</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${userEmail}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Role</td>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>${userRole}</strong></td>
              </tr>
              <tr style="background-color: #f0f0f0;">
                <td style="padding: 10px; border: 1px solid #ddd;">Login Time</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Admin login notification sent to ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    console.error('❌ Error sending admin login notification:', error.message);
  }
};

module.exports = {
  sendSignupConfirmationEmail,
  sendAdminSignupNotification,
  sendAdminLoginNotification
};
