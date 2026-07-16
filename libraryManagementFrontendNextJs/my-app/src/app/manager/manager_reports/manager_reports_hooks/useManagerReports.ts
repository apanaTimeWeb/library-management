import { useState, useEffect } from 'react';
import { ManagerReportsData, FetchState } from '../manager_reports_types/ManagerReportsTypes';
import { MOCK_MANAGER_REPORTS_DATA } from '../manager_reports_constants/ManagerReportsMockData';

// RESPONSIBILITY: Manages state and simulates data fetching for the Manager Reports module.
// DATA FLOW: Mock Data -> useManagerReports -> ManagerReportsClient -> Subcomponents

export function useManagerReports() {
  const [data, setData] = useState<ManagerReportsData | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [dateRange, setDateRange] = useState('This Month');

  useEffect(() => {
    let isMounted = true;
    setFetchState('loading');

    // Simulating an API call with setTimeout
    const timer = setTimeout(() => {
      if (isMounted) {
        setData(MOCK_MANAGER_REPORTS_DATA);
        setFetchState('success');
      }
    }, 600);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [dateRange]); // Refetch when dateRange changes (even though data is mock)

  return {
    data,
    fetchState,
    dateRange,
    setDateRange,
  };
}
