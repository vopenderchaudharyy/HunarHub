import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-logo-text"><span>Hunar</span><span className="orange">Hub</span></span>
          <p>Local Skills, Global Impact</p>
        </div>
        <div className="auth-art">🏺👞🧵🎨</div>
        <div className="auth-quote">
          <h2>Empowering Local Skills.</h2>
          <h2 className="orange">Building Stronger Communities.</h2>
          <p>Join thousands of artisans and entrepreneurs across India.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2>Welcome Back!</h2>
          <p className="auth-sub">Login to your HunarHub account</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <div className="forgot-link"><Link to="#">Forgot Password?</Link></div>
            </div>

            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-divider"><span>OR</span></div>

          <div className="auth-switch">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>

          <div className="auth-switch" style={{ marginTop: 8 }}>
            Want to sell? <Link to="/signup?role=seller">Join as a Seller</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
