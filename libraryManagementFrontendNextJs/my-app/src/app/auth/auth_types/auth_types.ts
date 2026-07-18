import { z } from 'zod';
import { authLoginSchema, authSignupSchema, authForgotPasswordSchema, authResetPasswordSchema } from '@/app/auth/auth_utils/auth_validation';


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
export interface AuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  error?: string;
  statusCode?: number;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type AuthLoginPayload = z.infer<typeof authLoginSchema>;
export type AuthSignupPayload = z.infer<typeof authSignupSchema>;
export type AuthForgotPasswordPayload = z.infer<typeof authForgotPasswordSchema>;
export type AuthResetPasswordPayload = z.infer<typeof authResetPasswordSchema>;
