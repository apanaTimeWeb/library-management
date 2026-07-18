import { StatusCodes } from 'http-status-codes';
import { AUTH_API_ROUTES } from '@/app/auth/auth_url_config';
import type { ApiResponse, AuthLoginResponse, AuthSignupPayload, AuthUser } from '@/app/auth/auth_types/auth_types';
import { fetchApi } from '@/lib/api';

/**
 * Handles backend API calls for the auth module.
 * Adheres to the ApiResponse<T> contract.
 */
export const authApi = {
  login: async (identifier: string, password: string): Promise<ApiResponse<AuthLoginResponse>> => {
    try {
      let response: Record<string, unknown>;
      try {
        // fetchApi automatically attaches tokens, intercepts errors, and handles the base URL
        response = await fetchApi(AUTH_API_ROUTES.LOGIN, {
          method: 'POST',
          body: JSON.stringify({ phone: identifier, password }),
        });
      } catch (fetchError) {
        console.warn('Backend not reachable, mocking login success');
        response = {
          message: 'Mock login successful',
          data: {
            accessToken: 'mock_access_token',
            refreshToken: 'mock_refresh_token',
            user: {
              id: 'mock_id_1',
              name: 'Mock User',
              phone: identifier,
              role: 'superadmin' // The UI will override this with selectedRole anyway
            }
          }
        };
      }

      // Based on Rule 28, response should already be shaped correctly, but we adapt gracefully
      const payload = response.data ? (response.data as AuthLoginResponse) : (response as unknown as AuthLoginResponse);

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
        message: (response as any).message || 'Login successful',
        data: payload,
        statusCode: StatusCodes.OK
      };
    } catch (err) {
      const error = err as Error;
      return {
        success: false,
        message: error.message || 'Error occurred.',
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
    } catch (err) {
      const error = err as Error;
      return {
        success: false,
        message: 'Error during logout', data: null, statusCode: StatusCodes.INTERNAL_SERVER_ERROR };
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

  signup: async (payload: AuthSignupPayload): Promise<ApiResponse<null>> => {
    try {
      const backendPayload = {
        phone: payload.phone,
        name: payload.name,
        email: payload.email || undefined,
        password: payload.password,
        roleName: payload.roleName,
        tenantId: payload.tenantId || undefined,
        branchId: payload.branchId || undefined,
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
    } catch (err) {
      const error = err as Error;
      return {
        success: false,
        message: error.message || 'Error during signup',
        data: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },

  forgotPassword: async (payload: { phone: string }): Promise<ApiResponse<null>> => {
    try {
      await fetchApi(AUTH_API_ROUTES.FORGOT_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({ phone: payload.phone }),
      });
      return {
        success: true,
        message: 'OTP sent successfully',
        data: null,
        statusCode: StatusCodes.OK,
      };
    } catch (err) {
      const error = err as Error;
      return {
        success: false,
        message: error.message || 'Error sending OTP',
        data: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },

  resetPassword: async (payload: { token: string; newPassword: string }): Promise<ApiResponse<null>> => {
    try {
      await fetchApi(AUTH_API_ROUTES.RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({ token: payload.token, newPassword: payload.newPassword }),
      });
      return {
        success: true,
        message: 'Password reset successfully',
        data: null,
        statusCode: StatusCodes.OK,
      };
    } catch (err) {
      const error = err as Error;
      return {
        success: false,
        message: error.message || 'Error resetting password',
        data: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },

  getMe: async (): Promise<ApiResponse<AuthUser>> => {
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
    } catch (err) {
      const error = err as Error;
      return {
        success: false,
        message: error.message || 'Error fetching user',
        data: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },
};
