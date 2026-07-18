import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AuthStoreState {
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
