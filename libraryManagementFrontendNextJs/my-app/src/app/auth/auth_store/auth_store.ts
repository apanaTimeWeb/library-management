// RESPONSIBILITY: Global store for authentication state (`Rule 5`).
// DATA FLOW: UI Component -> useAuthStore -> authApi -> backend (`Rule 39`).

import { create } from 'zustand';
import { authApi } from '@/app/auth/auth_api/auth_api';
import type { 
  AuthLoginPayload, 
  AuthSignupPayload, 
  AuthForgotPasswordPayload, 
  AuthResetPasswordPayload,
  AuthUser,
  FetchState 
} from '@/app/auth/auth_types/auth_types';

interface AuthStoreState {
  fetchState: FetchState;
  user: AuthUser | null;
  errorMessage: string | null;
  
  // Actions
  login: (payload: AuthLoginPayload) => Promise<{ success: boolean; message: string; userRole?: string }>;
  signup: (payload: AuthSignupPayload) => Promise<{ success: boolean; message: string }>;
  forgotPassword: (payload: AuthForgotPasswordPayload) => Promise<{ success: boolean; message: string }>;
  resetPassword: (payload: AuthResetPasswordPayload) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  fetchState: 'idle',
  user: null,
  errorMessage: null,

  login: async (payload) => {
    set({ fetchState: 'loading', errorMessage: null });
    const response = await authApi.login(payload.phone, payload.password);
    
    if (response.success && response.data) {
      set({ fetchState: 'success', user: response.data.user });
      return { success: true, message: response.message, userRole: response.data.user.role };
    } else {
      set({ fetchState: 'error', errorMessage: response.message });
      return { success: false, message: response.message };
    }
  },

  signup: async (payload) => {
    set({ fetchState: 'loading', errorMessage: null });
    const response = await authApi.signup(payload);
    
    if (response.success) {
      set({ fetchState: 'success' });
      return { success: true, message: response.message };
    } else {
      set({ fetchState: 'error', errorMessage: response.message });
      return { success: false, message: response.message };
    }
  },

  forgotPassword: async (payload) => {
    set({ fetchState: 'loading', errorMessage: null });
    const response = await authApi.forgotPassword({ phone: payload.phone });
    
    if (response.success) {
      set({ fetchState: 'success' });
      return { success: true, message: response.message };
    } else {
      set({ fetchState: 'error', errorMessage: response.message });
      return { success: false, message: response.message };
    }
  },

  resetPassword: async (payload) => {
    set({ fetchState: 'loading', errorMessage: null });
    const response = await authApi.resetPassword({ token: payload.token, newPassword: payload.newPassword });
    
    if (response.success) {
      set({ fetchState: 'success' });
      return { success: true, message: response.message };
    } else {
      set({ fetchState: 'error', errorMessage: response.message });
      return { success: false, message: response.message };
    }
  },

  logout: async () => {
    set({ fetchState: 'loading', errorMessage: null });
    await authApi.logout();
    set({ user: null, fetchState: 'idle' });
  },

  clearError: () => set({ errorMessage: null, fetchState: 'idle' }),
}));
