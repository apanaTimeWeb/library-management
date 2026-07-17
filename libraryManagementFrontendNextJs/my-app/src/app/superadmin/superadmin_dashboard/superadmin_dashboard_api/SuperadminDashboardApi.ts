import type { SuperadminDashboardDataResponse } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';
import { SUPERADMIN_DASHBOARD_MOCK_DATA } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardConstants';

export async function fetchSuperadminDashboardData(): Promise<SuperadminDashboardDataResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return SUPERADMIN_DASHBOARD_MOCK_DATA as SuperadminDashboardDataResponse;
}
