import type { SuperadminReportsDataResponse } from '@/app/superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes';
import type { ApiResponse } from '@/app/superadmin/superadmin_shared_components/superadmin_types';
// RESPONSIBILITY: Fetches superadmin reports data.
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';

export async function fetchSuperadminReportsData(dateRange: string = 'Last 6 Months'): Promise<ApiResponse<SuperadminReportsDataResponse>> {
  const response = await fetchApi(`${SUPERADMIN_API_ROUTES.REPORTS}?dateRange=${encodeURIComponent(dateRange)}`);
  return response as ApiResponse<SuperadminReportsDataResponse>;
}
