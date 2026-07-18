import { useEffect } from 'react';
import { useManagerStudentReportsStore } from '@/app/manager/manager_student-reports/manager_student_reports_store/manager_student_reports_store';

// DATA FLOW: API -> Store -> Hook -> Component

export function useManagerStudentReports(dateRange: string) {
  const { reports, reportsStatus, reportsError, fetchReports } = useManagerStudentReportsStore();

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    fetchReports(dateRange);
  }, [dateRange, fetchReports]);

  return {
    reports,
    status: reportsStatus,
    error: reportsError
  };
}
