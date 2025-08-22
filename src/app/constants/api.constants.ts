export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:3000',
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register'
  },
  USER: {
    PROFILE: '/api/users/profile',
    DELETE_ACCOUNT: '/api/users/account'
  }
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
} as const;
