// RESPONSIBILITY: Manages superadmin system tenants data.
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';
import type {
  CreateTenantPayload,
  UpdateTenantPayload,
  TenantsPaginatedResponse,
  SuperadminSystemTenant,
} from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemTenantsTypes';
import type { ApiResponse } from '@/app/superadmin/superadmin_shared_components/superadmin_types';

const TENANTS_ENDPOINT = SUPERADMIN_API_ROUTES.TENANTS;

export async function fetchTenants(page = 1, limit = 10): Promise<ApiResponse<TenantsPaginatedResponse>> {
  const response = await fetchApi(`${TENANTS_ENDPOINT}?page=${page}&limit=${limit}`);
  return response as ApiResponse<TenantsPaginatedResponse>;
}

export async function createTenant(payload: CreateTenantPayload): Promise<ApiResponse<SuperadminSystemTenant>> {
  const response = await fetchApi(TENANTS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response as ApiResponse<SuperadminSystemTenant>;
}

export async function updateTenant(id: string, payload: UpdateTenantPayload): Promise<ApiResponse<SuperadminSystemTenant>> {
  const response = await fetchApi(`${TENANTS_ENDPOINT}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return response as ApiResponse<SuperadminSystemTenant>;
}

export async function deleteTenant(id: string): Promise<ApiResponse<null>> {
  const response = await fetchApi(`${TENANTS_ENDPOINT}/${id}`, {
    method: 'DELETE',
  });
  return response as ApiResponse<null>;
}
