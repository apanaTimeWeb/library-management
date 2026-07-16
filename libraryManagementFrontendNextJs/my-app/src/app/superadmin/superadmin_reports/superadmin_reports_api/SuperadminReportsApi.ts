import type { SuperadminReportsDataResponse } from '../superadmin_reports_types/SuperadminReportsTypes';
import { SUPERADMIN_REPORTS_MOCK_DATA } from '../superadmin_reports_constants/SuperadminReportsConstants';

export async function fetchSuperadminReportsData(dateRange: string = 'Last 6 Months'): Promise<SuperadminReportsDataResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // In a real application, you would pass `dateRange` to your backend query.
  // For now, we return the mock data directly.
  return SUPERADMIN_REPORTS_MOCK_DATA;
}
