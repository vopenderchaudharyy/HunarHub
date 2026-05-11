import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <path d="M10 13c0-1 .5-2 1.5-2.5L16 8l4.5 2.5c1 .5 1.5 1.5 1.5 2.5v4l-6 3-6-3v-4z" fill="#E8580A"/>
                </svg>
              </div>
              <div>
                <span className="f-hunar">Hunar</span>
                <span className="f-hub">Hub</span>
                <small>Local Skills, Global Impact</small>
              </div>
            </Link>
            <p>Empowering local skills and building stronger communities.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-icon">f</a>
              <a href="#" aria-label="Instagram" className="social-icon">in</a>
              <a href="#" aria-label="Twitter" className="social-icon">tw</a>
              <a href="#" aria-label="YouTube" className="social-icon">yt</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore">Explore</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/become-seller">Become a Seller</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* For Customers */}
          <div className="footer-col">
            <h4>For Customers</h4>
            <ul>
              <li><Link to="#">Help Center</Link></li>
              <li><Link to="#">Track Order</Link></li>
              <li><Link to="#">Safety Tips</Link></li>
              <li><Link to="#">Contact Us</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* For Entrepreneurs */}
          <div className="footer-col">
            <h4>For Entrepreneurs</h4>
            <ul>
              <li><Link to="/become-seller">Seller Guide</Link></li>
              <li><Link to="#">Resources</Link></li>
              <li><Link to="#">Community</Link></li>
              <li><Link to="#">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col newsletter-col">
            <h4>Subscribe to our newsletter</h4>
            <p>Get updates on new features and offers.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 HunarHub. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
