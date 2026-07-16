import { fetchApi } from '@/lib/api';
import { ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import type { ApiResponse } from '@/app/admin/admin_types/admin_types';

/**
 * RESPONSIBILITY: Fetches settings data.
 */
export async function fetchAdminSettings(serverToken?: string): Promise<ApiResponse<unknown>> {
  const options = serverToken ? { headers: { Authorization: `Bearer ${serverToken}` } } : {};
  return fetchApi(ADMIN_API_ROUTES.SETTINGS, options);
}

