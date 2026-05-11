import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoriesPage.css';

const CATEGORIES = [
  { icon: '👞', name: 'Cobbler', desc: 'Shoe repair, polishing and custom footwear.', count: '120+', path: '/explore?cat=cobbler' },
  { icon: '🏺', name: 'Potter (Kumhar)', desc: 'Handmade pots, clay items and terracotta products.', count: '85+', path: '/explore?cat=potter' },
  { icon: '🧵', name: 'Tailor', desc: "Men's wear, women's wear and stitching services.", count: '150+', path: '/explore?cat=tailor' },
  { icon: '🎨', name: 'Artisan', desc: 'Handicrafts, wood carving and traditional art.', count: '210+', path: '/explore?cat=artisan' },
  { icon: '🏪', name: 'Small Vendor', desc: 'Local products, groceries and daily essentials.', count: '320+', path: '/explore?cat=vendor' },
  { icon: '🔨', name: 'Carpenter', desc: 'Furniture making, woodwork and home solutions.', count: '95+', path: '/explore?cat=carpenter' },
  { icon: '💍', name: 'Bangles Maker', desc: 'Traditional bangles, jewelry and accessories.', count: '60+', path: '/explore?cat=bangles' },
  { icon: '🪡', name: 'Embroidery', desc: 'Hand embroidery, thread work and custom designs.', count: '110+', path: '/explore?cat=embroidery' },
  { icon: '🖌️', name: 'Painter', desc: 'Wall painting, art works and custom designs.', count: '75+', path: '/explore?cat=painter' },
  { icon: '🧶', name: 'Weaver', desc: 'Handwoven clothes, fabrics and traditional wear.', count: '130+', path: '/explore?cat=weaver' },
];

const CategoriesPage = () => {
  const [search, setSearch] = useState('');

  const filtered = CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="categories-page">
      {/* Hero */}
      <div className="cat-hero">
        <div className="cat-hero-left">
          <h1>Categories</h1>
          <p>Browse skills, services, and products by category and discover local talent near you.</p>
          <div className="cat-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search for a category or skill..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="cat-hero-art">🏺🎨👞</div>
      </div>

      {/* Categories Grid */}
      <div className="container cat-body">
        <div className="cat-grid">
          {filtered.map((cat, i) => (
            <Link to={cat.path} key={i} className="cat-card">
              <div className="cat-card-icon">{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
              <div className="cat-count">{cat.count} Professionals</div>
            </Link>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="trust-bar">
          <div className="trust-item">
            <div className="trust-icon">🛡️</div>
            <div>
              <strong>Verified Professionals</strong>
              <p>All professionals are verified and trusted.</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">⭐</div>
            <div>
              <strong>Quality Services</strong>
              <p>High quality services you can rely on.</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">📍</div>
            <div>
              <strong>Support Local</strong>
              <p>Empower local talent and strengthen communities.</p>
            </div>
          </div>
          <div className="cat-cta-box">
            <h4>Can't find what you're looking for?</h4>
            <p>We're here to help you discover the right service.</p>
            <Link to="/explore" className="btn-outline">Explore All Services →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
