import { StatusCodes } from 'http-status-codes';
import { AUTH_API_ROUTES } from '../auth_url_config';
import type { ApiResponse, AuthLoginResponse } from '../auth_types/auth_types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

/**
 * Handles backend API calls for the auth module.
 * Adheres to the ApiResponse<T> contract.
 */
export const authApi = {
  login: async (identifier: string, password: string): Promise<ApiResponse<AuthLoginResponse>> => {
    try {
      const res = await fetch(`${API_BASE_URL}${AUTH_API_ROUTES.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: identifier, password }),
        credentials: 'include',
      });

      const data = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        let errorMsg = data.message || 'An error occurred during login.';
        if (typeof errorMsg === 'object' && errorMsg !== null) {
          errorMsg = errorMsg.message || JSON.stringify(errorMsg);
        }
        if (Array.isArray(errorMsg)) {
          errorMsg = errorMsg.join(', ');
        }
        return {
          success: false,
          message: errorMsg,
          error: data.error,
          statusCode: res.status,
          data: null
        };
      }
      
      // The backend should return the envelope if we are strictly following Rule 28.
      // E.g., data.data contains the AuthLoginResponse. If the backend hasn't been updated yet, 
      // we gracefully handle the shape assuming the backend might just return the response payload directly.
      const payload = data.data !== undefined ? (data.data as AuthLoginResponse) : (data as AuthLoginResponse);
      
      // Store tokens for client-side use if successful
      if (typeof window !== 'undefined' && payload) {
        localStorage.setItem('access_token', payload.accessToken);
        if (payload.refreshToken) {
          localStorage.setItem('refresh_token', payload.refreshToken);
        }
        if (payload.user) {
          localStorage.setItem('user', JSON.stringify(payload.user));
        }
        document.cookie = `access_token=${payload.accessToken}; path=/; SameSite=Strict; max-age=900`;
      }
      
      return {
        success: true,
        message: data.message || 'Login successful',
        data: payload,
        statusCode: StatusCodes.OK
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Network error occurred.',
        data: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR
      };
    }
  },
  
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      let token = null;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('access_token');
      }
      if (token) {
        await fetch(`${API_BASE_URL}${AUTH_API_ROUTES.LOGOUT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });
      }
      return { success: true, message: 'Logged out successfully', data: null, statusCode: StatusCodes.OK };
    } catch (err: any) {
      return { success: false, message: 'Error during logout', data: null, statusCode: StatusCodes.INTERNAL_SERVER_ERROR };
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
        document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
        window.location.href = AUTH_API_ROUTES.LOGIN;
      }
    }
  },

  signup: async (payload: any): Promise<ApiResponse<null>> => {
    // Stub implementation as per original code that used timeout. 
    // It should eventually POST to AUTH_API_ROUTES.SIGNUP
    return new Promise(res => {
      setTimeout(() => {
        res({
          success: true,
          message: 'Account created successfully',
          data: null,
          statusCode: StatusCodes.CREATED
        });
      }, 1200);
    });
  },
};
