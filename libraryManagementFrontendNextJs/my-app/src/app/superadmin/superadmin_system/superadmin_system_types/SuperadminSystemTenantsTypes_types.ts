import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminSystemTenant {
  id: string;
  name: string;
  domain: string;
  adminEmail: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateTenantPayload {
  name: string;
  domain: string;
  adminEmail: string;
  status?: string;
}
export interface UpdateTenantPayload {
  name?: string;
  domain?: string;
  adminEmail?: string;
  status?: string;
}
export interface TenantsPaginatedResponse {
  data: SuperadminSystemTenant[];
  total: number;
  page: number;
  limit: number;
}
