import type { SuperadminSystemHealthDataResponse } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_types/SuperadminSystemHealthTypes';
import { SUPERADMIN_SYSTEM_HEALTH_MOCK_DATA } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_constants/SuperadminSystemHealthConstants';

export async function fetchSuperadminSystemHealthData(): Promise<SuperadminSystemHealthDataResponse> {
  // Simulate network delay for fetching system health
  await new Promise(res => setTimeout(res, 1200));
  return SUPERADMIN_SYSTEM_HEALTH_MOCK_DATA;
}
