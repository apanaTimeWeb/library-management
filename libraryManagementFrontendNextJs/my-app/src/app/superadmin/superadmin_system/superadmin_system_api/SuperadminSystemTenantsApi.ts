import { fetchApi } from '@/lib/api';
import type {
  CreateTenantPayload,
  UpdateTenantPayload,
  TenantsPaginatedResponse,
  SuperadminSystemTenant,
} from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemTenantsTypes';

const TENANTS_ENDPOINT = '/superadmin/system/tenants';

export async function fetchTenants(page = 1, limit = 10): Promise<TenantsPaginatedResponse> {
  const response = await fetchApi(`${TENANTS_ENDPOINT}?page=${page}&limit=${limit}`);
  return response.data as TenantsPaginatedResponse;
}

export async function createTenant(payload: CreateTenantPayload): Promise<SuperadminSystemTenant> {
  const response = await fetchApi(TENANTS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response.data as SuperadminSystemTenant;
}

export async function updateTenant(id: string, payload: UpdateTenantPayload): Promise<SuperadminSystemTenant> {
  const response = await fetchApi(`${TENANTS_ENDPOINT}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return response.data as SuperadminSystemTenant;
}

export async function deleteTenant(id: string): Promise<void> {
  await fetchApi(`${TENANTS_ENDPOINT}/${id}`, {
    method: 'DELETE',
  });
}
