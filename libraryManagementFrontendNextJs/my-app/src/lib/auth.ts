// RESPONSIBILITY: Renders or handles logic for auth.ts.


export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: string;
  tenantId?: string;
  branchId?: string;
  lastLoginAt?: string;
}
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

/**
 * Auth Utility â€” Client Side
 *
 * Handles login, logout, token refresh, and current user retrieval.
 * Tokens stored in httpOnly cookies (set by the backend) â€” not accessible via JS.
 *
 * Zero Trust: All role/identity verification happens on the backend.
 * This is only a convenience layer for the frontend UI.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
// â”€â”€â”€ Login â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 'identifier' can be phone number or email â€” backend matches by phone field
export async function login(identifier: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Backend LoginDto expects 'phone' field â€” we send identifier as phone
    body: JSON.stringify({ phone: identifier, password }),
    credentials: 'include',
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: 'Login failed' }));
    let errorMsg = errorBody.message;
    if (typeof errorMsg === 'object' && errorMsg !== null) {
      errorMsg = errorMsg.message || JSON.stringify(errorMsg);
    }
    if (Array.isArray(errorMsg)) {
      errorMsg = errorMsg.join(', ');
    }
    throw new Error(errorMsg || `Login failed: ${res.status}`);
  }

  const data: LoginResponse = await res.json();

  // Store tokens for client-side use
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', data.accessToken);
    if (data.refreshToken) {
      localStorage.setItem('refresh_token', data.refreshToken);
    }
    localStorage.setItem('user', JSON.stringify(data.user));
    // Store token in cookie for middleware (server-side route protection)
    document.cookie = `access_token=${data.accessToken}; path=/; SameSite=Strict; max-age=900`;
  }

  return data;
}


// â”€â”€â”€ Logout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function logout(): Promise<void> {
  try {
    const token = getAccessToken();
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
    }
  } catch {
    // Even if backend call fails, clear client state
  } finally {
    clearAuthState();
  }
}

// â”€â”€â”€ Refresh Access Token â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;

    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      clearAuthState();
      return null;
    }

    const data = await res.json();
    localStorage.setItem('access_token', data.accessToken);
    document.cookie = `access_token=${data.accessToken}; path=/; SameSite=Strict; max-age=900`;
    return data.accessToken;
  } catch {
    clearAuthState();
    return null;
  }
}

// â”€â”€â”€ Get Current User â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

// â”€â”€â”€ Get Access Token â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

// â”€â”€â”€ Check if Logged In â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

// â”€â”€â”€ Clear All Auth State (on logout) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function clearAuthState(): void {
  if (typeof window === 'undefined') return;

  // Clear localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');

  // Clear cookies
  document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
  document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';

  // Redirect to login
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  }
}

