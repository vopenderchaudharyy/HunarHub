import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorksPage.css';

const customerSteps = [
  { num: 1, icon: '🔍', title: 'Explore', desc: 'Search for local professionals or browse categories to find the right skill or product.' },
  { num: 2, icon: '📋', title: 'View Profiles', desc: 'Check profiles, reviews, ratings, services, products and prices.' },
  { num: 3, icon: '🛒', title: 'Place Request / Order', desc: 'Send a service request or place an order for your desired product.' },
  { num: 4, icon: '🤝', title: 'Connect', desc: 'The professional accepts your request and confirms the details.' },
  { num: 5, icon: '✅', title: 'Get It Done', desc: 'Service is delivered or product is shipped. You rate and review.' },
];

const sellerSteps = [
  { num: 1, icon: '👤', title: 'Sign Up', desc: 'Create your account and complete your profile.' },
  { num: 2, icon: '🏪', title: 'List Services / Products', desc: 'Add your skills, services or products with details, images and pricing.' },
  { num: 3, icon: '🔔', title: 'Receive Requests / Orders', desc: 'Get notified when customers send service requests or place orders.' },
  { num: 4, icon: '📋', title: 'Accept & Fulfill', desc: 'Accept the request, deliver the service or product on time.' },
  { num: 5, icon: '💰', title: 'Earn & Grow', desc: 'Get paid, build your reputation and grow your business.' },
];

const whyChoose = [
  { icon: '🛡️', title: 'Trusted & Verified', desc: 'All professionals are verified to ensure quality and safety.' },
  { icon: '🏷️', title: 'Affordable Prices', desc: 'Get the best services and products at fair prices.' },
  { icon: '📍', title: 'Local & Sustainable', desc: 'Support local talent and strengthen your community.' },
  { icon: '🎧', title: '24/7 Support', desc: "We're here to help you anytime, anywhere." },
];

const HowItWorksPage = () => {
  return (
    <div className="hiw-page">
      {/* Hero */}
      <div className="hiw-hero">
        <h1>How HunarHub Works</h1>
        <div className="hiw-divider"></div>
        <p>We make it simple for you to connect, collaborate, and support local talent in just a few easy steps.</p>
        <div className="hiw-hero-art">🏺 🧵 👞</div>
      </div>

      <div className="container hiw-body">
        {/* For Customers */}
        <section className="hiw-section">
          <h2 className="hiw-section-title">For Customers</h2>
          <div className="hiw-divider-orange"></div>
          <div className="steps-row">
            {customerSteps.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="step-card">
                  <div className="step-num">{step.num}</div>
                  <div className="step-icon-wrap">
                    <span className="step-icon">{step.icon}</span>
                  </div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {i < customerSteps.length - 1 && (
                  <div className="step-connector">- - -</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* For Micro-Entrepreneurs */}
        <section className="hiw-section hiw-section-dark">
          <h2 className="hiw-section-title">For Micro-Entrepreneurs</h2>
          <div className="hiw-divider-orange"></div>
          <div className="steps-row steps-row-green">
            {sellerSteps.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="step-card">
                  <div className="step-num step-num-green">{step.num}</div>
                  <div className="step-icon-wrap">
                    <span className="step-icon">{step.icon}</span>
                  </div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {i < sellerSteps.length - 1 && (
                  <div className="step-connector">- - -</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Why Choose */}
        <section className="hiw-why">
          <h2 className="section-title">Why Choose HunarHub?</h2>
          <div className="hiw-divider-orange" style={{margin: '8px auto 40px'}}></div>
          <div className="why-grid">
            {whyChoose.map((w, i) => (
              <div key={i} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="hiw-cta">
          <div className="hiw-cta-left">
            <h2>Be a Part of the Change</h2>
            <p>Join HunarHub today and empower local skills, support small businesses, and build a stronger community.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn-primary">Join as a Customer</Link>
              <Link to="/become-seller" className="btn-outline-dark">Become a Seller</Link>
            </div>
          </div>
          <div className="hiw-cta-art">👞🏺🧵🎨</div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorksPage;
