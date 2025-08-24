export const API_ENDPOINTS = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  VIDEOS: {
    GET_ALL: '/videos',
    GET_BY_ID: '/videos/:id',
    UPLOAD: '/videos/upload',
    DELETE: '/videos/:id',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
  },
};
