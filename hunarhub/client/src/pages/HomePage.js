import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const categories = [
  { icon: '👞', name: 'Cobbler', sub: 'Shoe Repair & More', path: '/explore?cat=cobbler' },
  { icon: '🏺', name: 'Potter (Kumhar)', sub: 'Handmade Pottery', path: '/explore?cat=potter' },
  { icon: '🧵', name: 'Tailor', sub: 'Stitching & Alterations', path: '/explore?cat=tailor' },
  { icon: '🎨', name: 'Artisan', sub: 'Handicrafts & Decor', path: '/explore?cat=artisan' },
  { icon: '🏪', name: 'Small Vendor', sub: 'Local Products & More', path: '/explore?cat=vendor' },
];

const entrepreneurs = [
  { id: 1, name: 'Rajesh Kumar', category: 'Cobbler', categoryClass: 'cat-cobbler', rating: 4.8, reviews: 124, location: 'Lucknow, UP', skills: 'Shoe Repair, Leather Work, Shoe Polishing', img: null },
  { id: 2, name: 'Sushila Kumari', category: 'Potter', categoryClass: 'cat-potter', rating: 4.7, reviews: 98, location: 'Lucknow, UP', skills: 'Handmade Pots, Planters, Clay Items', img: null },
  { id: 3, name: 'Imran Tailor', category: 'Tailor', categoryClass: 'cat-tailor', rating: 4.6, reviews: 76, location: 'Lucknow, UP', skills: "Men's Wear, Women's Wear, Alterations", img: null },
  { id: 4, name: 'Neha Sharma', category: 'Artisan', categoryClass: 'cat-artisan', rating: 4.7, reviews: 55, location: 'Lucknow, UP', skills: 'Embroidery, Handicrafts, Home Decor', img: null },
];

const products = [
  { id: 1, name: 'Hand Painted Pot', price: 499, rating: 4.6, reviews: 32, emoji: '🏺' },
  { id: 2, name: 'Handcrafted Leather Shoes', price: 1299, rating: 4.7, reviews: 18, emoji: '👞' },
  { id: 3, name: 'Embroidered Tote Bag', price: 599, rating: 4.5, reviews: 27, emoji: '👜' },
  { id: 4, name: 'Traditional Wall Decor', price: 799, rating: 4.8, reviews: 21, emoji: '🎨' },
];

const features = [
  { icon: '📈', title: 'Boost Local Economy', desc: 'Your support helps local entrepreneurs grow.' },
  { icon: '🤝', title: 'Unique & Handmade', desc: 'Discover one-of-a-kind products and services.' },
  { icon: '📱', title: 'Easy & Convenient', desc: 'Find, connect and order in just a few clicks.' },
  { icon: '🔒', title: 'Safe & Secure', desc: 'Your data and transactions are always protected.' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchSkill, setSearchSkill] = React.useState('');
  const [searchLoc, setSearchLoc] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?skill=${searchSkill}&location=${searchLoc}`);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#f59e0b' : '#d1d5db' }}>★</span>
    ));
  };

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">
              Discover Local Skills,
              <span className="hero-orange"> Support Local Talent</span>
            </h1>
            <p className="hero-desc">
              Find skilled professionals and unique handmade products from trusted local entrepreneurs near you.
            </p>
            <form className="hero-search" onSubmit={handleSearch}>
              <div className="search-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search for skills or services..."
                  value={searchSkill}
                  onChange={e => setSearchSkill(e.target.value)}
                />
              </div>
              <div className="search-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <input
                  type="text"
                  placeholder="Enter your location..."
                  value={searchLoc}
                  onChange={e => setSearchLoc(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Explore Now
              </button>
            </form>
            <div className="hero-badges">
              <div className="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <div>
                  <strong>Trusted & Verified</strong>
                  <span>Local Professionals</span>
                </div>
              </div>
              <div className="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <div>
                  <strong>Safe & Secure</strong>
                  <span>Platform</span>
                </div>
              </div>
              <div className="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
                <div>
                  <strong>Support Local</strong>
                  <span>Communities</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-illustration">
              <div className="hero-artisan-card">
                <span className="artisan-emoji">🏺</span>
                <div>
                  <strong>10,000+ Artisans</strong>
                  <span>Across India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse by Categories</h2>
            <Link to="/categories" className="view-all-link">View All Categories →</Link>
          </div>
          <div className="section-divider"></div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link to={cat.path} key={i} className="category-card">
                <div className="cat-icon">{cat.icon}</div>
                <h4>{cat.name}</h4>
                <p>{cat.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Entrepreneurs */}
      <section className="entrepreneurs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Entrepreneurs</h2>
            <Link to="/explore" className="view-all-link">View All →</Link>
          </div>
          <div className="section-divider"></div>
          <div className="entrepreneurs-grid">
            {entrepreneurs.map((e) => (
              <div key={e.id} className="entrepreneur-card">
                <div className="ent-img-wrap">
                  <div className="ent-img-placeholder">
                    {e.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className={`ent-category ${e.categoryClass}`}>{e.category}</span>
                </div>
                <div className="ent-info">
                  <h4>{e.name}</h4>
                  <div className="ent-rating">
                    <span className="stars">{renderStars(e.rating)}</span>
                    <span>{e.rating} ({e.reviews})</span>
                  </div>
                  <div className="ent-location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {e.location}
                  </div>
                  <p className="ent-skills">{e.skills}</p>
                  <Link to={`/seller/${e.id}`} className="btn-outline" style={{fontSize: '12px', padding: '8px 16px'}}>View Profile</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/explore" className="view-all-link">View All Products →</Link>
          </div>
          <div className="section-divider"></div>
          <div className="products-grid">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <div className="product-img">
                  <span className="product-emoji">{p.emoji}</span>
                  <button className="wishlist-btn">♡</button>
                </div>
                <div className="product-info">
                  <h4>{p.name}</h4>
                  <div className="product-price">₹{p.price.toLocaleString()}</div>
                  <div className="product-rating">
                    <span className="stars">{'★'.repeat(Math.floor(p.rating))}</span>
                    <span>{p.rating} ({p.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-item">
                <span className="feature-icon">{f.icon}</span>
                <div>
                  <strong>{f.title}</strong>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-left">
              <h2>Are you a skilled professional or seller?</h2>
              <p>Join HunarHub and reach thousands of customers.</p>
              <div className="cta-buttons">
                <Link to="/become-seller" className="btn-primary">Become a Seller</Link>
                <Link to="/how-it-works" className="btn-outline-dark">Learn More</Link>
              </div>
            </div>
            <div className="cta-art">
              <span style={{fontSize: '80px'}}>🧵🏺👞</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
