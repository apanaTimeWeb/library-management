import type { SuperadminDashboardDataResponse } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';
import { SUPERADMIN_DASHBOARD_MOCK_DATA } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardConstants';

import { fetchApi } from '@/lib/api';
import { DASHBOARD_URL_CONFIG } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_url_config';

export async function fetchSuperadminDashboardData(): Promise<SuperadminDashboardDataResponse> {
  const response = await fetchApi(DASHBOARD_URL_CONFIG.ENDPOINTS.GET_DASHBOARD);
  return response.data as SuperadminDashboardDataResponse;
}
