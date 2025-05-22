import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Debug: Log user state to verify admin status
  console.log('Navbar user:', user, 'isAdmin:', user?.userType === 'admin');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      style={{
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        padding: '8px 15px',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Link
          to="/"
          style={{
            color: '#fff',
            fontSize: '22px',
            fontWeight: 'bold',
            textDecoration: 'none',
            marginRight: '10px',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#FFD700')}
          onMouseLeave={(e) => (e.target.style.color = '#fff')}
        >
          Oyamine
        </Link>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          flexShrink: 1,
          minWidth: 0,
        }}
      >
        <Link to="/" style={{ color: '#fff', fontSize: '15px', textDecoration: 'none', position: 'relative', transition: 'color 0.3s ease', padding: '5px 0' }} onMouseEnter={(e) => { e.target.style.color = '#FFD700'; e.target.style.setProperty('--underline-width', '100%'); }} onMouseLeave={(e) => { e.target.style.color = '#fff'; e.target.style.setProperty('--underline-width', '0'); }}>
          Home
          <span style={{ content: '""', position: 'absolute', width: 'var(--underline-width, 0)', height: '2px', bottom: '-2px', left: 0, backgroundColor: '#FFD700', transition: 'width 0.3s ease' }} />
        </Link>
        <Link to="/shop" style={{ color: '#fff', fontSize: '15px', textDecoration: 'none', position: 'relative', transition: 'color 0.3s ease', padding: '5px 0' }} onMouseEnter={(e) => { e.target.style.color = '#FFD700'; e.target.style.setProperty('--underline-width', '100%'); }} onMouseLeave={(e) => { e.target.style.color = '#fff'; e.target.style.setProperty('--underline-width', '0'); }}>
          Shop
          <span style={{ content: '""', position: 'absolute', width: 'var(--underline-width, 0)', height: '2px', bottom: '-2px', left: 0, backgroundColor: '#FFD700', transition: 'width 0.3s ease' }} />
        </Link>
        <Link to="/cart" style={{ color: '#fff', fontSize: '18px', textDecoration: 'none', position: 'relative', transition: 'color 0.3s ease', padding: '5px 0' }} onMouseEnter={(e) => { e.target.style.color = '#FFD700'; e.target.style.setProperty('--underline-width', '100%'); }} onMouseLeave={(e) => { e.target.style.color = '#fff'; e.target.style.setProperty('--underline-width', '0'); }}>
          🛒
          <span style={{ content: '""', position: 'absolute', width: 'var(--underline-width, 0)', height: '2px', bottom: '-2px', left: 0, backgroundColor: '#FFD700', transition: 'width 0.3s ease' }} />
        </Link>
        <Link to="/contact" style={{ color: '#fff', fontSize: '15px', textDecoration: 'none', position: 'relative', transition: 'color 0.3s ease', padding: '5px 0' }} onMouseEnter={(e) => { e.target.style.color = '#FFD700'; e.target.style.setProperty('--underline-width', '100%'); }} onMouseLeave={(e) => { e.target.style.color = '#fff'; e.target.style.setProperty('--underline-width', '0'); }}>
          Contact
          <span style={{ content: '""', position: 'absolute', width: 'var(--underline-width, 0)', height: '2px', bottom: '-2px', left: 0, backgroundColor: '#FFD700', transition: 'width 0.3s ease' }} />
        </Link>
        {user ? (
          <>
            <Link
              to={user.userType === 'admin' ? '/admin/dashboard' : '/dashboard'}
              style={{ color: '#fff', fontSize: '15px', textDecoration: 'none', position: 'relative', transition: 'color 0.3s ease', padding: '5px 0' }}
              onMouseEnter={(e) => { e.target.style.color = '#FFD700'; e.target.style.setProperty('--underline-width', '100%'); }}
              onMouseLeave={(e) => { e.target.style.color = '#fff'; e.target.style.setProperty('--underline-width', '0'); }}
            >
              {user.userType === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
              <span style={{ content: '""', position: 'absolute', width: 'var(--underline-width, 0)', height: '2px', bottom: '-2px', left: 0, backgroundColor: '#FFD700', transition: 'width 0.3s ease' }} />
            </Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#FFD700',
                color: '#000',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'background-color 0.3s ease, transform 0.1s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#e6c200'; e.target.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = '#FFD700'; e.target.style.transform = 'scale(1)'; }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', fontSize: '15px', textDecoration: 'none', position: 'relative', transition: 'color 0.3s ease', padding: '5px 0' }} onMouseEnter={(e) => { e.target.style.color = '#FFD700'; e.target.style.setProperty('--underline-width', '100%'); }} onMouseLeave={(e) => { e.target.style.color = '#fff'; e.target.style.setProperty('--underline-width', '0'); }}>
              Login
              <span style={{ content: '""', position: 'absolute', width: 'var(--underline-width, 0)', height: '2px', bottom: '-2px', left: 0, backgroundColor: '#FFD700', transition: 'width 0.3s ease' }} />
            </Link>
            <Link to="/signup" style={{ color: '#fff', fontSize: '15px', textDecoration: 'none', position: 'relative', transition: 'color 0.3s ease', padding: '5px 0' }} onMouseEnter={(e) => { e.target.style.color = '#FFD700'; e.target.style.setProperty('--underline-width', '100%'); }} onMouseLeave={(e) => { e.target.style.color = '#fff'; e.target.style.setProperty('--underline-width', '0'); }}>
              Signup
              <span style={{ content: '""', position: 'absolute', width: 'var(--underline-width, 0)', height: '2px', bottom: '-2px', left: 0, backgroundColor: '#FFD700', transition: 'width 0.3s ease' }} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;