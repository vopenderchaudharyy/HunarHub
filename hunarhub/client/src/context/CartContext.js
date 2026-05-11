import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(i => i._id === item._id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i._id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount: cartItems.length }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
