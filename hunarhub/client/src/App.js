import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import CategoriesPage from './pages/CategoriesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import BecomeSellerPage from './pages/BecomeSellerPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SellerDetailPage from './pages/SellerDetailPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/become-seller" element={<BecomeSellerPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/seller/:id" element={<SellerDetailPage />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
