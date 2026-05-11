import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore', path: '/explore' },
    { label: 'Categories', path: '/categories' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Become a Seller', path: '/become-seller' },
    { label: 'About Us', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4C10.477 4 6 8.477 6 14c0 2.5 1 4.8 2.6 6.5L16 28l7.4-7.5C25 18.8 26 16.5 26 14c0-5.523-4.477-10-10-10z" fill="#E8580A" opacity="0.2"/>
              <path d="M10 13c0-1 .5-2 1.5-2.5L16 8l4.5 2.5c1 .5 1.5 1.5 1.5 2.5v4l-6 3-6-3v-4z" fill="#E8580A"/>
              <path d="M13 16l3 1.5 3-1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-hunar">Hunar</span>
            <span className="logo-hub">Hub</span>
            <small>Local Skills, Global Impact</small>
          </div>
        </Link>

        {/* Nav Links */}
        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''} ${link.path === '/about' ? 'about-link' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          <div className="location-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Lucknow</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>

          <button className="cart-btn" onClick={() => navigate('/explore')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {isLoggedIn ? (
            <div className="user-menu">
              <div className="user-avatar">{user?.name?.[0] || 'U'}</div>
              <button onClick={logout} className="btn-outline">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
