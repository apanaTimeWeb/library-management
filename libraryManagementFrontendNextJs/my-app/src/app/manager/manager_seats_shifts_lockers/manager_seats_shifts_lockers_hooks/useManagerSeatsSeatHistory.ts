// RESPONSIBILITY: Renders or handles logic for useManagerSeatsSeatHistory.ts.
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';
import { useState, useEffect } from 'react';
import { useSeatsStore } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_store/manager_seats_shifts_lockers_store';
import { SeatHistoryEntry } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types';

// DATA FLOW: Hook -> useManagerSeatsSeatHistory -> Consuming UI Component
export function useManagerSeatsSeatHistory() {
  const [searchTerm, setSearchTerm] = useUrlState('searchTerm', '');
  const [seatFilter, setSeatFilter] = useUrlState('seatFilter', 'All Seats');
  const [search, setSearch] = useUrlState('search', '');
  const [dateFrom, setDateFrom] = useUrlState('dateFrom', '');
  const [dateTo, setDateTo] = useUrlState('dateTo', '');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const { seatHistoryData, status, fetchSeatHistoryData } = useSeatsStore();

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    if (status === 'idle' || seatHistoryData.length === 0) {
      fetchSeatHistoryData();
    }
  }, [status, seatHistoryData.length, fetchSeatHistoryData]);

  const filtered = (seatHistoryData as SeatHistoryEntry[]).filter((h) => {
    const matchSeat = seatFilter === 'All Seats' || h.seatNo === seatFilter;
    const matchSearch = !search ||
      h.studentName!.toLowerCase().includes(search.toLowerCase()) ||
      h.smartId!.toLowerCase().includes(search.toLowerCase());
    const matchFrom = !dateFrom || h.occupiedFrom! >= dateFrom;
    const matchTo = !dateTo || h.occupiedTill! <= dateTo;
    return matchSeat && matchSearch && matchFrom && matchTo;
  });

  return {
    searchTerm,
    setSearchTerm,
    seatFilter,
    setSeatFilter,
    search,
    setSearch,
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

