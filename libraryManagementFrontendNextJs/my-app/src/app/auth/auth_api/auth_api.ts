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
    try {
      const backendPayload = {
        phone: payload.phone,
        name: payload.ownerName,
        email: payload.email,
        password: payload.password,
        roleName: 'owner', // Default role for signup as per payload assumptions
      };

      await fetchApi(AUTH_API_ROUTES.SIGNUP, {
        method: 'POST',
        body: JSON.stringify(backendPayload),
      });

      return {
        success: true,
        message: 'Account created successfully',
        data: null,
        statusCode: StatusCodes.CREATED,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Error during signup',
        data: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },

  forgotPassword: async (payload: { identity: string }): Promise<ApiResponse<null>> => {
    try {
      await fetchApi(AUTH_API_ROUTES.FORGOT_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({ phone: payload.identity }),
      });
      return {
        success: true,
        message: 'OTP sent successfully',
        data: null,
        statusCode: StatusCodes.OK,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Error sending OTP',
        data: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },

  resetPassword: async (payload: { otp: string; newPassword: string }): Promise<ApiResponse<null>> => {
    try {
      await fetchApi(AUTH_API_ROUTES.RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({ token: payload.otp, newPassword: payload.newPassword }),
      });
      return {
        success: true,
        message: 'Password reset successfully',
        data: null,
        statusCode: StatusCodes.OK,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Error resetting password',
        data: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },

  getMe: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await fetchApi(AUTH_API_ROUTES.ME, {
        method: 'GET',
      });
      return {
        success: true,
        message: 'User fetched successfully',
        data: response.data ?? response,
        statusCode: StatusCodes.OK,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Error fetching user',
        data: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },
};
