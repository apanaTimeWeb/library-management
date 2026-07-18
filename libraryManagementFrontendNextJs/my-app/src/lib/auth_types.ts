import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
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
