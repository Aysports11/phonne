import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const AdminDashboard = () => {
  console.log('Rendering AdminDashboard component');
  const { user, isAdmin } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  if (!user || !isAdmin) {
    return <p style={{ padding: '80px 20px', fontFamily: 'Arial, sans-serif', color: '#fff' }}>Access denied. Admins only.</p>;
  }

  const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("https://images.pexels.com/photos/29805437/pexels-photo-29805437/free-photo-of-elegant-black-perfume-bottle-on-a-dark-background.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '80px 20px',
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '40px',
          borderRadius: '10px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Admin Dashboard</h1>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Registered Users</h2>
        {registeredUsers.length === 0 ? (
          <p>No users registered.</p>
        ) : (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: '15px', borderBottom: '1px solid #fff', textAlign: 'left' }}>Username</th>
                <th style={{ padding: '15px', borderBottom: '1px solid #fff', textAlign: 'left' }}>User Type</th>
                <th style={{ padding: '15px', borderBottom: '1px solid #fff', textAlign: 'left' }}>Cart Items</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.map((registeredUser, index) => (
                <tr key={index}>
                  <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{registeredUser.username}</td>
                  <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{registeredUser.userType}</td>
                  <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>
                    {cartItems[registeredUser.username] && cartItems[registeredUser.username].length > 0 ? (
                      cartItems[registeredUser.username].map((item, itemIndex) => (
                        <div key={itemIndex}>
                          {item.name} - ₦{item.price.toLocaleString()}
                        </div>
                      ))
                    ) : (
                      'No items in cart.'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;