import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const UserDashboard = () => {
  console.log('Rendering UserDashboard component');
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  if (!user) {
    return <p style={{ padding: '80px 20px', fontFamily: 'Arial, sans-serif' }}>Please log in to view your dashboard.</p>;
  }

  const userCart = cartItems[user.username] || [];

  return (
    <div style={{ padding: '80px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>User Dashboard</h1>
      <p><strong>Welcome, {user.username}!</strong></p>
      <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Your Cart</h2>
      {userCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {userCart.map((item, index) => (
            <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
              {item.name} - ₦{item.price.toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;