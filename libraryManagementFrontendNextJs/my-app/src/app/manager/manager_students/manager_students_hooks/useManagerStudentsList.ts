// RESPONSIBILITY: Renders or handles logic for useManagerStudentsList.ts.
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';
import { useState, useEffect, useMemo } from 'react';
import { useManagerDebounce } from '@/app/manager/manager_shared_hooks/useManagerDebounce';
import { useStudentsStore } from '@/app/manager/manager_students/manager_students_store/manager_students_store';

/**
 * Custom hook to fetch and filter students.
 * DATA FLOW: API â†’ useManagerStudentsList â†’ ManagerStudentsClient
 */
// DATA FLOW: API â†’ useManagerStudentsList.ts â†’ StudentsListComponent
export function useManagerStudentsList() {
  const { students, status, error, fetchData } = useStudentsStore();

  const [search, setSearch] = useUrlState('search', '');
  const [statusFilter, setStatusFilter] = useUrlState('statusFilter', 'all');
  const [shiftFilter, setShiftFilter] = useUrlState('shiftFilter', 'all');

  // Fetch data on mount if idle, dependencies included to satisfy linter
  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    if (status === 'idle') {
      fetchData();
    }
  }, [status, fetchData]);

  const debouncedSearch = useManagerDebounce(search, 300);

  const filtered = useMemo(() =>
    students.filter(s => {
      const q = debouncedSearch.toLowerCase();
      const matchSearch = !debouncedSearch ||
        s.name.toLowerCase().includes(q) ||
        s.phone.includes(debouncedSearch) ||
        s.smartId.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchShift  = shiftFilter  === 'all' || s.shift  === shiftFilter;
      return matchSearch && matchStatus && matchShift;
    }),
    [students, debouncedSearch, statusFilter, shiftFilter]
  );

  return {
    students,
    filtered,
    status,
    error,
    search, setSearch,
    statusFilter, setStatusFilter,
    shiftFilter, setShiftFilter
  };
}


