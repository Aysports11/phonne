import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  console.log('Rendering Signup component');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert('User already exists!');
      return;
    }
    users.push({
      username,
      password,
      userType: 'user',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please log in.');
    navigate('/login');
  };

  return (
    <div style={{ padding: '80px 20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;