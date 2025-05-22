import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems') || '{}');
    setCartItems(storedCart);
  }, []);

  const addToCart = (product) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    const userCart = cartItems[user.username] || [];
    const updatedCart = { ...cartItems, [user.username]: [...userCart, product] };
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    if (!user) {
      alert('Please log in to clear your cart.');
      return;
    }
    const updatedCart = { ...cartItems, [user.username]: [] };
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const getCartCount = () => {
    if (!user) return 0;
    return (cartItems[user.username] || []).length;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};