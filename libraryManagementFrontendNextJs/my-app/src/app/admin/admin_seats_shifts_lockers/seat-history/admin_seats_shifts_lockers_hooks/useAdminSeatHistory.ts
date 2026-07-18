// RESPONSIBILITY: Renders the useAdminSeatHistory.ts component/hook.
import { useState, useMemo } from 'react';
import { ADMIN_SEATS_MOCK_HISTORY } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_data/AdminSeatsMockData';
import { SeatHistoryEntry } from "./useAdminSeatHistory_types";

export function useAdminSeatHistory() {
  const [seatFilter, setSeatFilter] = useState('All Seats');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

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
