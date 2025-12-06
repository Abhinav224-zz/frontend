import { API_BASE_URL } from '../serverurl';

const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};
export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));
export const removeUser = () => localStorage.removeItem('user');

const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...(options.body && { body: options.body }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error');
    return data;
  } catch (error) {
    throw error;
  }
};

export const authAPI = {
  signup: (name, email, password) => apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  login: (email, password) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getCurrentUser: () => apiRequest('/auth/me'),
};

