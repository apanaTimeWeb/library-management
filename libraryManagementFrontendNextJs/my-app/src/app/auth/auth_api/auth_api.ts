import { StatusCodes } from 'http-status-codes';
import { AUTH_API_ROUTES } from '../auth_url_config';
import type { ApiResponse, AuthLoginResponse } from '../auth_types/auth_types';
import { fetchApi } from '@/lib/api';

/**
 * Handles backend API calls for the auth module.
 * Adheres to the ApiResponse<T> contract.
 */
export const authApi = {
  login: async (identifier: string, password: string): Promise<ApiResponse<AuthLoginResponse>> => {
    try {
      // fetchApi automatically attaches tokens, intercepts errors, and handles the base URL
      const response = await fetchApi(AUTH_API_ROUTES.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ phone: identifier, password }),
      });

      // Based on Rule 28, response should already be shaped correctly, but we adapt gracefully
      const payload = response.data !== undefined ? (response.data as AuthLoginResponse) : (response as AuthLoginResponse);

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
        message: response.message || 'Login successful',
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
      await fetchApi(AUTH_API_ROUTES.LOGOUT, {
        method: 'POST',
      });
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
    // It should eventually POST to a tenant registration endpoint once available.
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
