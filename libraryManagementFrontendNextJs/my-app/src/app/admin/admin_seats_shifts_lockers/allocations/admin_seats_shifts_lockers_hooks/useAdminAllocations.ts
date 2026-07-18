// RESPONSIBILITY: Renders the useAdminAllocations.ts component/hook.
import { useState, useMemo } from 'react';
import { ADMIN_SEATS_MOCK_ALLOCATIONS } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_data/AdminSeatsMockData';


export interface Allocation {
  studentName: string;
  smartId: string;
  seatNo: string;
  shift: string;
  customSlots: string;
  lockerNo: string;
  validFrom: string;
  validTill: string;
  daysLeft: number;
  status: 'Active' | 'Expired' | 'Suspended';
}

export function useAdminAllocations() {
  const [shiftFilter, setShiftFilter] = useState('All Shifts');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = useMemo(() => {
    return (ADMIN_SEATS_MOCK_ALLOCATIONS as Allocation[]).filter(a => {
      const matchShift = shiftFilter === 'All Shifts' || a.shift === shiftFilter;
      const matchStatus = statusFilter === 'All Statuses' || a.status === statusFilter;
      const matchFrom = !dateFrom || a.validFrom >= dateFrom;
      const matchTo = !dateTo || a.validTill <= dateTo;
      return matchShift && matchStatus && matchFrom && matchTo;
    });
  }, [shiftFilter, statusFilter, dateFrom, dateTo]);

  return {
    shiftFilter,
    setShiftFilter,
    statusFilter,
    setStatusFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    filtered
  };
}
