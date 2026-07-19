import { useUrlState } from '@/app/admin/admin_shared_hooks/useUrlState';
// RESPONSIBILITY: Renders the useAdminSeatHistory.ts component/hook.
import { useState, useMemo } from 'react';
import { ADMIN_SEATS_MOCK_HISTORY } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_shifts_lockers_utils/AdminSeatsMockData';


export interface SeatHistoryEntry {
  seatNo: string;
  studentName: string;
  smartId: string;
  shift: string;
  occupiedFrom: string;
  occupiedTill: string;
  duration: string;
  reason: 'Admission' | 'Shift Change' | 'Seat Change';
}

export function useAdminSeatHistory() {
  const [seatFilter, setSeatFilter] = useUrlState('seatFilter', 'All Seats' as string);
  const [search, setSearch] = useUrlState('search', '' as string);
  const [dateFrom, setDateFrom] = useUrlState('dateFrom', '' as string);
  const [dateTo, setDateTo] = useUrlState('dateTo', '' as string);

  const filtered = useMemo(() => {
    return (ADMIN_SEATS_MOCK_HISTORY as SeatHistoryEntry[]).filter(h => {
      const matchSeat = seatFilter === 'All Seats' || h.seatNo === seatFilter;
      const matchSearch = !search ||
        h.studentName.toLowerCase().includes(search.toLowerCase()) ||
        h.smartId.toLowerCase().includes(search.toLowerCase());
      const matchFrom = !dateFrom || h.occupiedFrom >= dateFrom;
      const matchTo = !dateTo || h.occupiedTill <= dateTo;
      return matchSeat && matchSearch && matchFrom && matchTo;
    });
  }, [seatFilter, search, dateFrom, dateTo]);

  return {
    seatFilter,
    setSeatFilter,
    search,
    setSearch,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    filtered
  };
}

