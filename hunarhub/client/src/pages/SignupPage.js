import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') === 'seller' ? 'seller' : 'customer';

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', role: defaultRole,
  });
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
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      login(data.user, data.token);
      navigate(form.role === 'seller' ? '/become-seller' : '/');
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
          <h2>Join HunarHub Today.</h2>
          <h2 className="orange">Grow Together.</h2>
          <p>Connect with local talent and build a stronger community.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2>Create Account</h2>
          <p className="auth-sub">Join HunarHub and start your journey</p>

          {/* Role Toggle */}
          <div className="role-toggle">
            <button
              type="button"
              className={`role-btn ${form.role === 'customer' ? 'active' : ''}`}
              onClick={() => setForm({ ...form, role: 'customer' })}
            >
              👤 Customer
            </button>
            <button
              type="button"
              className={`role-btn ${form.role === 'seller' ? 'active' : ''}`}
              onClick={() => setForm({ ...form, role: 'seller' })}
            >
              🏪 Seller / Entrepreneur
            </button>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
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
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? 'Creating Account...' : `Sign Up as ${form.role === 'seller' ? 'Seller' : 'Customer'}`}
            </button>
          </form>

          <div className="auth-divider"><span>OR</span></div>

          <div className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
