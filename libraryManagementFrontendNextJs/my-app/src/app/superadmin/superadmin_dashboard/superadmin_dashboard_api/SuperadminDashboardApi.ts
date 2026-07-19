// RESPONSIBILITY: Fetches superadmin dashboard data.
import type { SuperadminDashboardDataResponse } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';
import type { ApiResponse } from '@/app/superadmin/superadmin_shared_components/SuperadminTypes';
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/SuperadminUrlConfig';

export async function fetchSuperadminDashboardData(): Promise<ApiResponse<SuperadminDashboardDataResponse>> {
  const response = await fetchApi(SUPERADMIN_API_ROUTES.DASHBOARD);
  return response as ApiResponse<SuperadminDashboardDataResponse>;
}
