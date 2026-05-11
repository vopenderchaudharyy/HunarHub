import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './ExplorePage.css';

const ALL_SELLERS = [
  { id: 1, name: 'Rajesh Kumar', category: 'Cobbler', type: 'Shoe Repair Expert', location: 'Lucknow, UP', rating: 4.8, reviews: 124, price: 299, emoji: '👞' },
  { id: 2, name: 'Sushila Kumari', category: 'Potter', type: 'Potter (Kumhar)', location: 'Lucknow, UP', rating: 4.7, reviews: 98, price: 349, emoji: '🏺' },
  { id: 3, name: 'Imran Tailor', category: 'Tailor', type: 'Tailor', location: 'Lucknow, UP', rating: 4.6, reviews: 76, price: 199, emoji: '🧵' },
  { id: 4, name: 'Arvind Artisan', category: 'Artisan', type: 'Wood Carver', location: 'Lucknow, UP', rating: 4.9, reviews: 110, price: 499, emoji: '🎨' },
  { id: 5, name: 'Mohit Verma', category: 'Small Vendor', type: 'Small Vendor', location: 'Lucknow, UP', rating: 4.5, reviews: 68, price: 149, emoji: '🏪' },
  { id: 6, name: 'Pooja Bangles', category: 'Bangles Maker', type: 'Bangles Maker', location: 'Lucknow, UP', rating: 4.7, reviews: 53, price: 129, emoji: '💍' },
  { id: 7, name: 'Dinesh Carpenter', category: 'Carpenter', type: 'Carpenter', location: 'Lucknow, UP', rating: 4.6, reviews: 82, price: 399, emoji: '🔨' },
  { id: 8, name: 'Neha Embroidery', category: 'Embroidery', type: 'Embroidery Artist', location: 'Lucknow, UP', rating: 4.8, reviews: 64, price: 249, emoji: '🪡' },
  { id: 9, name: 'Meena Painter', category: 'Painter', type: 'Pottery Painter', location: 'Lucknow, UP', rating: 4.7, reviews: 59, price: 199, emoji: '🖌️' },
  { id: 10, name: 'Ravi Repair', category: 'Cobbler', type: 'Shoe Repair Expert', location: 'Lucknow, UP', rating: 4.6, reviews: 71, price: 149, emoji: '👡' },
];

const CATEGORIES = ['All', 'Cobbler', 'Potter', 'Tailor', 'Artisan', 'Small Vendor', 'Carpenter', 'Bangles Maker'];

const ExplorePage = () => {
  const [searchParams] = useSearchParams();
  const [selectedCat, setSelectedCat] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [location, setLocation] = useState('');
  const [searchSkill, setSearchSkill] = useState('');
  const [searchLoc, setSearchLoc] = useState('');
  const [sortBy, setSortBy] = useState('Most Relevant');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const skill = searchParams.get('skill') || '';
    const loc = searchParams.get('location') || '';
    setSearchSkill(skill);
    setSearchLoc(loc);
  }, [searchParams]);

  const filtered = ALL_SELLERS.filter(s => {
    const catMatch = selectedCat === 'All' || s.category === selectedCat;
    const ratingMatch = s.rating >= minRating;
    const priceMatch = s.price <= maxPrice;
    const locMatch = !location || s.location.toLowerCase().includes(location.toLowerCase());
    const skillMatch = !searchSkill || s.type.toLowerCase().includes(searchSkill.toLowerCase()) || s.name.toLowerCase().includes(searchSkill.toLowerCase());
    return catMatch && ratingMatch && priceMatch && locMatch && skillMatch;
  });

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#f59e0b' : '#d1d5db' }}>★</span>
    ));
  };

  return (
    <div className="explore-page">
      {/* Top Search Bar */}
      <div className="explore-hero">
        <div className="explore-hero-left">
          <h1>Explore Local Talent</h1>
          <p>Find trusted professionals and unique handmade products near you.</p>
        </div>
        <div className="explore-search-bar">
          <div className="explore-search-input">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
            <input
              type="text"
              placeholder="Search skill or service"
              value={searchSkill}
              onChange={e => setSearchSkill(e.target.value)}
            />
          </div>
          <div className="explore-search-input">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <input
              type="text"
              placeholder="Enter location"
              value={searchLoc}
              onChange={e => setSearchLoc(e.target.value)}
            />
          </div>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Search
          </button>
        </div>
        <div className="explore-hero-art">🏺</div>
      </div>

      <div className="explore-body container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="reset-btn" onClick={() => { setSelectedCat('All'); setMinRating(0); setMaxPrice(10000); setLocation(''); }}>
              ↺ Reset
            </button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <div className="filter-options">
              {['Cobbler', 'Potter (Kumhar)', 'Tailor', 'Artisan', 'Small Vendor', 'Carpenter', 'Bangles Maker'].map(cat => (
                <label key={cat} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCat === cat.split(' ')[0]}
                    onChange={() => setSelectedCat(selectedCat === cat.split(' ')[0] ? 'All' : cat.split(' ')[0])}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Location</h4>
            <div className="location-input-wrap">
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="price-range"
            />
            <div className="price-labels">
              <span>₹0</span>
              <span>₹{maxPrice.toLocaleString()}{maxPrice === 10000 ? '+' : ''}</span>
            </div>
          </div>

          <div className="filter-group">
            <h4>Rating</h4>
            {[4.5, 4.0, 3.5, 3.0].map(r => (
              <label key={r} className="filter-checkbox">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === r}
                  onChange={() => setMinRating(r)}
                />
                <span style={{ color: '#f59e0b' }}>{'★'.repeat(Math.floor(r))}</span> {r} & above
              </label>
            ))}
          </div>

          <button className="btn-primary apply-btn" onClick={() => {}}>Apply Filters</button>
        </aside>

        {/* Results */}
        <div className="explore-results">
          {/* Category Tabs */}
          <div className="results-topbar">
            <div className="results-info">Showing {filtered.length} results</div>
            <div className="sort-wrap">
              <span>Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option>Most Relevant</option>
                <option>Rating: High to Low</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="cat-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-tab ${selectedCat === cat ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
            <button className="cat-tab-more">›</button>
          </div>

          <div className="sellers-grid">
            {filtered.map(seller => (
              <div key={seller.id} className="seller-card">
                <div className="seller-card-img">
                  <div className="seller-avatar">{seller.emoji}</div>
                  <button
                    className={`heart-btn ${wishlist.includes(seller.id) ? 'wishlisted' : ''}`}
                    onClick={() => toggleWishlist(seller.id)}
                  >
                    {wishlist.includes(seller.id) ? '♥' : '♡'}
                  </button>
                </div>
                <div className="seller-card-info">
                  <h4>{seller.name}</h4>
                  <div className="seller-type">{seller.type}</div>
                  <div className="seller-location">{seller.location}</div>
                  <div className="seller-meta">
                    <div className="seller-rating">
                      <span className="stars">{renderStars(seller.rating)}</span>
                      <span>{seller.rating} ({seller.reviews})</span>
                    </div>
                    <div className="seller-price">
                      Starting at<br/>
                      <strong>₹{seller.price}</strong>
                    </div>
                  </div>
                  <Link to={`/seller/${seller.id}`} className="btn-outline view-btn">View Profile</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn">‹</button>
            {[1,2,3,4,5].map(n => (
              <button key={n} className={`page-btn ${n === 1 ? 'active' : ''}`}>{n}</button>
            ))}
            <button className="page-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
