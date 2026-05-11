import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SellerDetailPage.css';

const SELLERS_DATA = {
  1: { name: 'Rajesh Kumar', category: 'Cobbler', type: 'Shoe Repair Expert', location: 'Lucknow, UP', rating: 4.8, reviews: 124, price: 299, emoji: '👞', bio: 'I am a professional cobbler with 15+ years of experience. I specialize in shoe repair, leather work, and custom shoe polishing. My work is trusted by hundreds of customers across Lucknow.', services: [{ name: 'Basic Shoe Repair', price: 150, time: '1-2 days' }, { name: 'Leather Sole Replacement', price: 299, time: '2-3 days' }, { name: 'Full Shoe Restoration', price: 599, time: '3-5 days' }, { name: 'Custom Shoe Polishing', price: 99, time: 'Same day' }], products: [{ name: 'Premium Shoe Polish Kit', price: 199, emoji: '✨' }, { name: 'Leather Conditioner', price: 149, emoji: '🧴' }] },
  2: { name: 'Sushila Kumari', category: 'Potter', type: 'Potter (Kumhar)', location: 'Lucknow, UP', rating: 4.7, reviews: 98, price: 349, emoji: '🏺', bio: 'Skilled pottery artist with 20+ years of experience. I create beautiful handmade pots, planters, and terracotta art pieces using traditional techniques passed down through generations.', services: [{ name: 'Custom Clay Pot', price: 349, time: '3-5 days' }, { name: 'Terracotta Planter Set', price: 699, time: '5-7 days' }, { name: 'Decorative Vase', price: 499, time: '4-6 days' }], products: [{ name: 'Handpainted Pot', price: 499, emoji: '🏺' }, { name: 'Clay Diyas Set (10)', price: 150, emoji: '🪔' }] },
  3: { name: 'Imran Tailor', category: 'Tailor', type: 'Tailor', location: 'Lucknow, UP', rating: 4.6, reviews: 76, price: 199, emoji: '🧵', bio: "Expert tailor with specialization in both men's and women's wear. I provide stitching, alterations, and custom design services with premium quality fabric work.", services: [{ name: "Men's Shirt Stitching", price: 299, time: '3-4 days' }, { name: "Women's Suit Stitching", price: 499, time: '4-5 days' }, { name: 'Alteration & Fitting', price: 199, time: '1-2 days' }], products: [{ name: 'Custom Kurta', price: 599, emoji: '👔' }, { name: 'Embroidered Dupatta', price: 399, emoji: '🧣' }] },
  4: { name: 'Arvind Artisan', category: 'Artisan', type: 'Wood Carver', location: 'Lucknow, UP', rating: 4.9, reviews: 110, price: 499, emoji: '🎨', bio: 'Master wood carver and artisan with expertise in traditional Indian handicrafts, wood carvings, and decorative art pieces. Each piece is crafted with love and precision.', services: [{ name: 'Custom Wood Carving', price: 999, time: '7-10 days' }, { name: 'Decorative Panel', price: 1499, time: '10-14 days' }, { name: 'Wall Art Piece', price: 799, time: '5-7 days' }], products: [{ name: 'Carved Wall Decor', price: 799, emoji: '🎨' }, { name: 'Wooden Showpiece', price: 499, emoji: '🪵' }] },
};

const SellerDetailPage = () => {
  const { id } = useParams();
  const seller = SELLERS_DATA[id] || SELLERS_DATA[1];
  const [activeTab, setActiveTab] = useState('services');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [message, setMessage] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOrder = (service) => {
    setSelectedService(service);
    setShowOrderModal(true);
  };

  const submitOrder = (e) => {
    e.preventDefault();
    setShowOrderModal(false);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#f59e0b' : '#d1d5db', fontSize: '18px' }}>★</span>
    ));
  };

  return (
    <div className="seller-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/explore">Explore</Link> / <span>{seller.name}</span>
        </div>

        {/* Profile Header */}
        <div className="seller-profile-header">
          <div className="seller-profile-left">
            <div className="seller-big-avatar">{seller.emoji}</div>
            <div className="seller-profile-info">
              <div className="seller-verified-badge">✅ Verified Professional</div>
              <h1>{seller.name}</h1>
              <div className="seller-profile-type">{seller.type}</div>
              <div className="seller-profile-meta">
                <span>📍 {seller.location}</span>
                <span>
                  <span style={{ color: '#f59e0b' }}>{'★'.repeat(5)}</span>
                  {seller.rating} ({seller.reviews} reviews)
                </span>
                <span>💰 Starting ₹{seller.price}</span>
              </div>
              <p className="seller-bio">{seller.bio}</p>
            </div>
          </div>
          <div className="seller-profile-actions">
            <button className="btn-primary" onClick={() => setShowOrderModal(true)}>
              📋 Send Request
            </button>
            <button className="btn-outline">💬 Message</button>
            <button className="btn-outline-dark">♡ Save</button>
          </div>
        </div>

        {orderSuccess && (
          <div className="order-success-banner">
            ✅ Your request has been sent to {seller.name}! They will contact you shortly.
          </div>
        )}

        {/* Tabs */}
        <div className="seller-tabs">
          {['services', 'products', 'reviews'].map(tab => (
            <button
              key={tab}
              className={`seller-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="seller-tab-content">
          {activeTab === 'services' && (
            <div className="services-grid">
              {seller.services.map((service, i) => (
                <div key={i} className="service-card">
                  <div className="service-info">
                    <h4>{service.name}</h4>
                    <div className="service-meta">
                      <span className="service-price">₹{service.price}</span>
                      <span className="service-time">⏱ {service.time}</span>
                    </div>
                  </div>
                  <button className="btn-primary service-order-btn" onClick={() => handleOrder(service)}>
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="products-list">
              {seller.products.map((product, i) => (
                <div key={i} className="product-list-card">
                  <div className="product-list-img">{product.emoji}</div>
                  <div className="product-list-info">
                    <h4>{product.name}</h4>
                    <div className="product-list-price">₹{product.price}</div>
                  </div>
                  <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-section">
              <div className="rating-summary">
                <div className="rating-big">{seller.rating}</div>
                <div>
                  <div className="stars-big">{renderStars(seller.rating)}</div>
                  <div className="rating-count">{seller.reviews} Reviews</div>
                </div>
              </div>
              <div className="review-list">
                {['Excellent work! Very satisfied.', 'Professional and timely service.', 'Great quality, will order again!'].map((review, i) => (
                  <div key={i} className="review-card">
                    <div className="review-header">
                      <div className="review-avatar">C{i + 1}</div>
                      <div>
                        <strong>Customer {i + 1}</strong>
                        <div style={{ color: '#f59e0b', fontSize: '13px' }}>★★★★★</div>
                      </div>
                    </div>
                    <p>{review}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Send Service Request</h3>
              <button className="modal-close" onClick={() => setShowOrderModal(false)}>✕</button>
            </div>
            {selectedService && (
              <div className="selected-service-info">
                <strong>{selectedService.name}</strong>
                <span>₹{selectedService.price} · {selectedService.time}</span>
              </div>
            )}
            <form onSubmit={submitOrder} className="modal-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter your phone" required />
              </div>
              <div className="form-group">
                <label>Message to {seller.name}</label>
                <textarea
                  rows={4}
                  placeholder="Describe your requirements..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Preferred Date</label>
                <input type="date" required />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline-dark" onClick={() => setShowOrderModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Send Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDetailPage;
