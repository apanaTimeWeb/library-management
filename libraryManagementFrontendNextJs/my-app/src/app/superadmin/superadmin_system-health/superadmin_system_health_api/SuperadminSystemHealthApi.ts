// RESPONSIBILITY: Fetches system health data.
import type { SuperadminSystemHealthDataResponse } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_types/SuperadminSystemHealthTypes';
import type { ApiResponse } from '@/app/superadmin/superadmin_shared_components/Superadminsuperadmin_types';
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';

export async function fetchSuperadminSystemHealthData(): Promise<ApiResponse<SuperadminSystemHealthDataResponse>> {
  const response = await fetchApi(SUPERADMIN_API_ROUTES.SYSTEM_HEALTH);
  return response as ApiResponse<SuperadminSystemHealthDataResponse>;
}
