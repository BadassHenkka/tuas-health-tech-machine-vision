import { atom, selector } from 'recoil';
import axios from 'axios';

import { headersConfigWithToken } from '../utils/auth';

// AUTH TOKEN STATE
export const authTokenState = atom({
  key: 'authTokenState',
  default: {
    token: localStorage.getItem('token'),
  },
});

// LOAD USER
export const loadUserProfile = selector({
  key: 'loadUserProfile',
  get: async ({ get }) => {
    const authToken = get(authTokenState);

    if (authToken.token) {
      // If there's a token in authToken
      // Try fetching user profile using that token
      try {
        const res = await axios.get(
          '/api/auth/user',
          headersConfigWithToken(authToken.token)
        );
        const isAuthenticated = true;
        const user = res.data;
        const token = authToken.token;

        return {
          isAuthenticated,
          user,
          token,
        };
      } catch (err) {
        localStorage.removeItem('token');
        const isAuthenticated = false;
        const user = null;
        const error = err;
        return {
          isAuthenticated,
          user,
          error,
        };
      }
    } else {
      // If no token, return these by default
      const isAuthenticated = false;
      const user = null;
      return {
        isAuthenticated,
        user,
      };
    }
  },
});
