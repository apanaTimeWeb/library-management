import { MOCK_DASHBOARD_DATA, MOCK_SEAT_MATRIX, MOCK_LOCKER_MATRIX, MOCK_ALLOCATIONS, MOCK_SEAT_HISTORY } from '@/app/manager/manager_mock_data';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';

export async function fetchDashboardData() {
  try {
    const res = await fetchApi('/manager/manager_dashboard');
    
    if (res?.data) {
       res.data.recentAdmissions = res.data.recentAdmissions?.length ? res.data.recentAdmissions : MOCK_DASHBOARD_DATA.recentAdmissions;
       res.data.recentEnquiries = res.data.recentEnquiries?.length ? res.data.recentEnquiries : MOCK_DASHBOARD_DATA.recentEnquiries;
       return res.data;
    }
    
    res.recentAdmissions = res.recentAdmissions?.length ? res.recentAdmissions : MOCK_DASHBOARD_DATA.recentAdmissions;
    res.recentEnquiries = res.recentEnquiries?.length ? res.recentEnquiries : MOCK_DASHBOARD_DATA.recentEnquiries;
    return res;
  } catch (err) {
    logger.warn('Failed to load dashboard data, returning pure mock');
    return MOCK_DASHBOARD_DATA;
  }
}
