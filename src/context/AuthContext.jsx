import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      let storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

      const migratedUsers = storedUsers.map(user => {
        if (user.email) {
          return {
            username: user.email,
            password: user.password,
            userType: user.role,
            createdAt: user.createdAt || new Date().toISOString(),
          };
        }
        return user;
      });
      localStorage.setItem('users', JSON.stringify(migratedUsers));
      storedUsers = migratedUsers;

      const authToken = JSON.parse(localStorage.getItem('authToken') || '{}');
      if (authToken.email) {
        localStorage.setItem('authToken', JSON.stringify({ username: authToken.email }));
      }

      const hasAdmin = storedUsers.some(user => user.userType === 'admin');
      const hasDefaultUser = storedUsers.some(user => user.username === 'ayo@gmail.com' && user.userType === 'user');
      
      if (!hasAdmin) {
        storedUsers.push({
          username: 'admin@ayo.com',
          password: 'admin123',
          userType: 'admin',
          createdAt: new Date().toISOString(),
        });
      }
      
      if (!hasDefaultUser) {
        storedUsers.push({
          username: 'ayo@gmail.com',
          password: 'user123',
          userType: 'user',
          createdAt: new Date().toISOString(),
        });
      }
      
      localStorage.setItem('users', JSON.stringify(storedUsers));

      const username = authToken?.username;
      if (username) {
        storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = storedUsers.find(user => user.username === username);
        if (foundUser) {
          setUser(foundUser);
          setIsAdmin(foundUser.userType === 'admin');
        } else {
          localStorage.removeItem('authToken');
        }
      }
    } catch (err) {
      console.error('Error in AuthContext useEffect:', err);
      localStorage.setItem('users', JSON.stringify([]));
      localStorage.setItem('authToken', JSON.stringify({}));
    }
  }, []);

  const login = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    console.log('Attempting login with:', { username, password });
    console.log('Stored users:', storedUsers);
    const user = storedUsers.find(user => user.username === username && user.password === password);
    console.log('Found user:', user);
    if (user) {
      setUser(user);
      setIsAdmin(user.userType === 'admin');
      localStorage.setItem('authToken', JSON.stringify({ username }));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const adminLogin = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(user => user.username === username && user.password === password && user.userType === 'admin');
    if (user) {
      setUser(user);
      setIsAdmin(true);
      localStorage.setItem('authToken', JSON.stringify({ username }));
    } else {
      throw new Error('Invalid admin credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};