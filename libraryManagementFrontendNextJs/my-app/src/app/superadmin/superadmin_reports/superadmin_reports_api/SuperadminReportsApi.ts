import type { SuperadminReportsDataResponse } from '@/app/superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes';
import type { ApiResponse } from '@/app/superadmin/superadmin_shared_components/Superadminsuperadmin_types';
import { SUPERADMIN_REPORTS_MOCK_DATA } from '@/app/superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants';
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';

export async function fetchSuperadminReportsData(dateRange: string = 'Last 6 Months'): Promise<ApiResponse<SuperadminReportsDataResponse>> {
  // Prototyping UI: Return mock data instead of calling non-existent backend
  return {
    data: SUPERADMIN_REPORTS_MOCK_DATA, success: true, message: 'Success',
    error: undefined,
    statusCode: 200
  };
}
