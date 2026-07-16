import { useEffect } from 'react';
import { useManagerStudentReportsStore } from '@/app/manager/manager_student-reports/manager_student_reports_store/manager_student_reports_store';

// DATA FLOW: API -> Store -> Hook -> Component

export function useStudentReports(dateRange: string) {
  const { reports, reportsStatus, reportsError, fetchReports } = useManagerStudentReportsStore();

  useEffect(() => {
    fetchReports(dateRange);
  }, [dateRange, fetchReports]);

  return {
    reports,
    status: reportsStatus,
    error: reportsError
  };
}
