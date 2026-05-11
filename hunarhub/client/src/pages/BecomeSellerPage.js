import React from 'react';
import { Link } from 'react-router-dom';
import './BecomeSellerPage.css';

const whySell = [
  { icon: '🌐', title: 'Wide Reach', desc: 'Get discovered by customers from your city and beyond.' },
  { icon: '📈', title: 'Boost Earnings', desc: 'More visibility, more customers, more income for you.' },
  { icon: '🛡️', title: 'Safe & Reliable', desc: 'Secure transactions and dedicated support you can trust.' },
  { icon: '🎧', title: 'Dedicated Support', desc: "We're here to help you at every step of your journey." },
];

const howItWorks = [
  { num: 1, icon: '👤', title: 'Create Account', desc: 'Sign up and complete your seller profile.' },
  { num: 2, icon: '🏪', title: 'List Your Skills / Products', desc: 'Add your services or products with details, images and pricing.' },
  { num: 3, icon: '✅', title: 'Get Verified', desc: 'Our team will verify your profile and listings.' },
  { num: 4, icon: '📣', title: 'Go Live & Get Orders', desc: 'Start receiving orders and service requests.' },
  { num: 5, icon: '💰', title: 'Earn & Grow', desc: 'Deliver quality work and grow your reputation.' },
];

const whoCanJoin = ['Cobbler (Moachi)', 'Potter (Kumhar)', 'Tailor', 'Artisan', 'Small Vendors & More'];

const requirements = [
  'Valid ID Proof (Aadhaar / PAN / Voter ID)',
  'Bank Account Details',
  'Business / Skills Information',
  'Photos of Work / Products',
  'Active Mobile Number & Email ID',
];

const testimonials = [
  { name: 'Rajesh Kumar, Cobbler', location: 'Lucknow', text: 'HunarHub has helped me reach so many new customers. My shoe repair business has grown like never before!' },
  { name: 'Sushila Kumari, Potter', location: 'Lucknow', text: 'Selling my handmade pots online was never this easy. Thank you HunarHub!' },
  { name: 'Imran Tailor', location: 'Lucknow', text: 'Service requests come regularly and the support team is always helpful.' },
];

const stats = [
  { num: '10,000+', label: 'Happy Sellers' },
  { num: '50,000+', label: 'Products Listed' },
  { num: '1,00,000+', label: 'Orders Completed' },
  { num: '4.8/5', label: 'Average Rating' },
];

const BecomeSellerPage = () => {
  return (
    <div className="seller-page">
      {/* Hero */}
      <div className="seller-hero">
        <div className="seller-hero-left">
          <div className="seller-hero-tag">⭐ JOIN HUNARHUB</div>
          <h1>Become a Seller,<br /><span className="orange-text">Grow Your Business</span></h1>
          <p>Showcase your skills, services, and handmade products to thousands of customers and build your brand online.</p>
          <div className="seller-hero-perks">
            <div className="perk-item">👥 Reach More Customers</div>
            <div className="perk-item">📈 Increase Your Earnings</div>
            <div className="perk-item">🏷️ Build Your Brand</div>
            <div className="perk-item">🛡️ 100% Safe & Secure</div>
          </div>
          <div className="seller-hero-btns">
            <Link to="/signup?role=seller" className="btn-primary">Join as a Seller →</Link>
            <Link to="/how-it-works" className="btn-outline-dark">Learn More →</Link>
          </div>
        </div>
        <div className="seller-hero-right">
          <div className="seller-hero-art">👥🏪</div>
          <div className="stats-card">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container seller-body">
        {/* Why Sell */}
        <section>
          <h2 className="section-title">Why Sell on HunarHub?</h2>
          <div className="section-divider"></div>
          <div className="why-sell-grid">
            {whySell.map((w, i) => (
              <div key={i} className="why-sell-card">
                <div className="why-sell-icon">{w.icon}</div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="section-title">How It Works for Sellers</h2>
          <div className="section-divider"></div>
          <div className="seller-steps">
            {howItWorks.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="seller-step">
                  <div className="seller-step-num">{step.num}</div>
                  <div className="seller-step-icon">{step.icon}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {i < howItWorks.length - 1 && <div className="seller-step-arrow">→</div>}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Who Can Join + Requirements */}
        <div className="join-req-grid">
          <div className="who-join-box">
            <h3>Who Can Join?</h3>
            <p>We welcome all local micro-entrepreneurs and skilled professionals, such as:</p>
            <div className="who-join-list">
              {whoCanJoin.map((w, i) => (
                <div key={i} className="who-join-item">
                  <span>👤</span> {w}
                </div>
              ))}
            </div>
          </div>
          <div className="req-box">
            <h3>Basic Requirements</h3>
            <ul>
              {requirements.map((r, i) => (
                <li key={i}>
                  <span className="req-check">✅</span> {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="req-art">🏺</div>
        </div>

        {/* Testimonials */}
        <section>
          <h2 className="section-title">What Our Sellers Say</h2>
          <div className="section-divider"></div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars" style={{marginBottom: '12px'}}>★★★★★</div>
                <p>"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.name[0]}</div>
                  <div>
                    <strong>– {t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="seller-final-cta">
          <div className="seller-cta-left">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of talented sellers already growing their business with HunarHub.</p>
          </div>
          <div className="seller-cta-right">
            <Link to="/signup?role=seller" className="btn-primary">Join as a Seller →</Link>
            <Link to="/login" className="btn-outline">Already a Seller? Login</Link>
          </div>
          <div className="seller-cta-art">🧵</div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSellerPage;
