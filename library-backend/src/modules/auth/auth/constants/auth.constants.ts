export const AUTH_CONSTANTS = {
  BCRYPT_COST: 12,
  MAX_FAILED_ATTEMPTS: 5,
  LOCK_DURATION_MINUTES: 15,
};

export const AUTH_ERRORS = {
  USER_ALREADY_EXISTS: 'User with this phone already exists',
  ROLE_NOT_FOUND: 'Role not found',
  BRANCH_NOT_FOUND: 'Branch not found',
  INVALID_CREDENTIALS: 'Invalid phone or password',
  ACCOUNT_LOCKED: 'Account is locked due to too many failed attempts.',
  ACCESS_DENIED: 'Access denied. Please login again.',
  INVALID_REFRESH_TOKEN:
    'Refresh token is invalid or was already used. Please login again.',
  USER_NOT_FOUND: 'User not found',
  JWT_SECRETS_MISSING: 'JWT secrets are not configured!',
};
