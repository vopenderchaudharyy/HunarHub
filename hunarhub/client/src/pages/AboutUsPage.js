import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUsPage.css';

const impact = [
  { icon: '👥', num: '10,000+', label: 'Happy Entrepreneurs' },
  { icon: '🛍️', num: '50,000+', label: 'Products Listed' },
  { icon: '🛒', num: '1,00,000+', label: 'Orders Completed' },
  { icon: '⭐', num: '4.8/5', label: 'Average Rating' },
  { icon: '📍', num: '100+', label: 'Cities Covered' },
];

const whyChoose = [
  { icon: '🛡️', title: 'Trusted & Verified', desc: 'We verify every seller to ensure authenticity and quality you can trust.' },
  { icon: '₹', title: 'Fair & Affordable', desc: 'Get the best services and products at fair prices without middlemen.' },
  { icon: '🤝', title: 'Support Local', desc: 'Every purchase supports local families and helps communities grow.' },
  { icon: '🎧', title: 'Dedicated Support', desc: "Our team is always here to help you at every step of your journey." },
];

const testimonials = [
  { name: 'Sushila Kumari', role: 'Potter', text: 'HunarHub has given my pottery business a new identity. I now get customers from different cities!', rating: 5 },
  { name: 'Imran Tailor', role: 'Tailor', text: 'I receive regular orders for stitching and alterations. It has really helped me increase my income.', rating: 5 },
  { name: 'Rajesh Kumar', role: 'Cobbler', text: 'The platform is easy to use and the support team is very helpful.', rating: 5 },
];

const values = ['Empowerment', 'Trust & Transparency', 'Community First', 'Quality & Respect'];

const AboutUsPage = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-left">
          <div className="about-tag">✦ ABOUT HUNARHUB ✦</div>
          <h1>Empowering Local Skills.<br /><span className="orange-text">Building Stronger Communities.</span></h1>
          <p>HunarHub is a digital marketplace that connects skilled micro-entrepreneurs with people who value local talent and handmade authenticity.</p>
          <Link to="/how-it-works" className="btn-outline">Our Journey →</Link>
        </div>
        <div className="about-hero-right">🏺</div>
      </div>

      {/* Mission Vision Values */}
      <div className="mvv-section">
        <div className="container mvv-grid">
          <div className="mvv-card">
            <div className="mvv-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To empower local micro-entrepreneurs by providing them a platform to showcase their skills, sell products, and grow their business with dignity and independence.</p>
          </div>
          <div className="mvv-card">
            <div className="mvv-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>A world where every skill is recognized, every artisan is empowered, and every community thrives through local opportunities.</p>
          </div>
          <div className="mvv-card">
            <h3>Our Values</h3>
            <div className="values-list">
              {values.map((v, i) => (
                <div key={i} className="value-item">
                  <span className="value-check">✅</span> {v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="story-section container">
        <div className="story-grid">
          <div className="story-left">
            <h2>Our Story</h2>
            <div className="story-divider"></div>
            <p>HunarHub was born out of a simple belief — every skill has value, and every artisan deserves a bigger platform.</p>
            <p>Across India, millions of talented individuals like cobblers, potters, tailors, artisans, and small vendors create amazing products and offer valuable services. But limited access to customers and digital tools holds them back.</p>
            <p>We built HunarHub to bridge this gap and create a space where talent meets opportunity.</p>
          </div>
          <div className="story-right">
            <div className="story-art">👥🏺🧵👞</div>
          </div>
        </div>
      </div>

      {/* Impact */}
      <div className="impact-section">
        <h2 className="section-title">Our Impact So Far</h2>
        <div className="section-divider"></div>
        <div className="container impact-grid">
          {impact.map((item, i) => (
            <div key={i} className="impact-card">
              <div className="impact-icon">{item.icon}</div>
              <div className="impact-num">{item.num}</div>
              <div className="impact-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose */}
      <div className="container why-section">
        <h2 className="section-title">Why Choose HunarHub?</h2>
        <div className="section-divider"></div>
        <div className="why-grid-about">
          {whyChoose.map((w, i) => (
            <div key={i} className="why-card-about">
              <div className="why-icon-about">{w.icon}</div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <h2 className="section-title">What People Say</h2>
        <div className="section-divider"></div>
        <div className="container about-testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="about-testimonial-card">
              <div className="quote-icon">"</div>
              <p>{t.text}</p>
              <div className="testimonial-author-row">
                <div className="author-avatar-about">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                  <div style={{color: '#f59e0b', fontSize: '13px'}}>{'★'.repeat(t.rating)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="container">
        <div className="about-final-cta">
          <div className="about-cta-left">
            <h2>Be a Part of Our Growing Community</h2>
            <p>Whether you're a customer or a seller, HunarHub is your partner in growth and success.</p>
          </div>
          <div className="about-cta-btns">
            <Link to="/become-seller" className="btn-primary">Join as a Seller →</Link>
            <Link to="/explore" className="btn-outline-dark">Explore Now</Link>
          </div>
          <div className="about-cta-art">🧵🏺</div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
