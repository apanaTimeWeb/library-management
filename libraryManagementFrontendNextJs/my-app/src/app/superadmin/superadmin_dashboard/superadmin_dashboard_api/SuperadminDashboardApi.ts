import type { SuperadminDashboardDataResponse } from '../superadmin_dashboard_types/SuperadminDashboardTypes';
import { SUPERADMIN_DASHBOARD_MOCK_DATA } from '../superadmin_dashboard_constants/SuperadminDashboardConstants';

export async function fetchSuperadminDashboardData(): Promise<SuperadminDashboardDataResponse> {
  // Simulate network delay for realistic rendering
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Return the mock data based on constants.
  // Once backend is ready, replace this with actual fetch logic.
  return SUPERADMIN_DASHBOARD_MOCK_DATA as SuperadminDashboardDataResponse;
}
