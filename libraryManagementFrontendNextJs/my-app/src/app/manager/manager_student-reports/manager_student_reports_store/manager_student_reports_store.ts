// RESPONSIBILITY: Renders or handles logic for manager_student_reports_store.ts.
import { create } from 'zustand';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import type { FetchState, ReportsData, ManagerStudentReportsState } from '@/app/manager/manager_student-reports/manager_student_reports_types/manager_student_reports_types';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
export const useManagerStudentReportsStore = create<ManagerStudentReportsState>((set) => ({
  reports: null,
  reportsStatus: 'idle',
  reportsError: null,

  fetchReports: async (dateRange: string) => {
    set({ reportsStatus: 'loading', reportsError: null });
    try {
      const data = await fetchApi<ReportsData>(`${MANAGER_ROUTES.STUDENT_REPORTS}?range=${encodeURIComponent(dateRange)}`);
      set({ reports: data, reportsStatus: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error('Failed to load student reports', { message });
      set({ reportsStatus: 'error', reportsError: message });
    }
  }
}));

