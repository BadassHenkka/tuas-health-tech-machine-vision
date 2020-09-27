import axios from 'axios';

// Setup config with token
export const headersConfigWithToken = (token) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  return config;
};

export const handleLogin = (username, password) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ username, password });

  return axios.post('/api/auth/login', body, config);
};

export const handleLogout = (token) => {
  return axios.post('/api/auth/logout', null, headersConfigWithToken(token));
};

export const handleRegister = (username, email, password) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ username, email, password });

  return axios.post('/api/auth/register', body, config);
};
