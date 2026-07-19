// RESPONSIBILITY: Renders or handles logic for useManagerSeatsAllocations.ts.
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';
import { useState, useEffect } from 'react';
import { useSeatsStore } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_store/manager_seats_shifts_lockers_store';
import { Allocation } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';

// DATA FLOW: Hook -> useManagerSeatsAllocations -> Consuming UI Component
export function useManagerSeatsAllocations() {
  const [searchTerm, setSearchTerm] = useUrlState('searchTerm', '' as string);
  const [shiftFilter, setShiftFilter] = useUrlState('shiftFilter', 'All Shifts' as string);
  const [statusFilter, setStatusFilter] = useUrlState('statusFilter', 'All Statuses' as string);
  const [dateFrom, setDateFrom] = useUrlState('dateFrom', '' as string);
  const [dateTo, setDateTo] = useUrlState('dateTo', '' as string);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { allocationsData, status, fetchAllocationsData } = useSeatsStore();

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    if (status === 'idle' || allocationsData.length === 0) {
      fetchAllocationsData();
    }
  }, [status, allocationsData.length, fetchAllocationsData]);

  const filtered = (allocationsData as Allocation[]).filter((a) => {
    const matchShift = shiftFilter === 'All Shifts' || a.shift === shiftFilter;
    const matchStatus = statusFilter === 'All Statuses' || a.status === statusFilter;
    const matchFrom = !dateFrom || a.validFrom! >= dateFrom;
    const matchTo = !dateTo || a.validTill! <= dateTo;
    const matchSearch = !searchTerm || 
      a.studentName!.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.smartId!.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.seatNo!.toLowerCase().includes(searchTerm.toLowerCase());
    return matchShift && matchStatus && matchFrom && matchTo && matchSearch;
  });

  return {
    searchTerm,
    setSearchTerm,
    shiftFilter,
    setShiftFilter,
    statusFilter,
    setStatusFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    page,
    setPage,
    limit,
    setLimit,
    filtered,
  };
}


