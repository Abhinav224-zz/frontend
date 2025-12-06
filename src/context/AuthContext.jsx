import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, getUser, setUser, setToken, removeToken, removeUser } from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = getUser();
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      // Verify token is still valid
      authAPI.getCurrentUser()
        .then((response) => {
          if (response.success) {
            setUserState(response.user);
            setUser(response.user);
          } else {
            logout();
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        setUserState(response.user);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await authAPI.signup(name, email, password);
      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        setUserState(response.user);
        return { success: true, user: response.user };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUserState(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

