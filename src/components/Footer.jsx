import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      marginTop: 'auto', 
    }}>
      <div style={{ marginBottom: '10px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }}>Home</Link>
        <Link to="/shop" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }}>Shop</Link>
        <Link to="/contact" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }}>Contact Us</Link>
      </div>
      <p style={{ margin: '10px 0' }}>
        &copy; {new Date().getFullYear()} Phonne. All rights reserved.
      </p>
      <p style={{ margin: '0', fontSize: '14px' }}>
        Contact us: <a href="mailto:support@phonne.com" style={{ color: '#fff', textDecoration: 'none' }}>support@phonne.com</a>
      </p>
    </footer>
  );
};

export default Footer;