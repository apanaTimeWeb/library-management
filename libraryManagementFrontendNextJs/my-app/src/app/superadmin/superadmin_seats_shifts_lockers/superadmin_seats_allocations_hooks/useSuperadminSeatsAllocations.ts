// DATA FLOW: SuperadminSeatsMockData -> useSuperadminSeatsAllocations -> SuperadminSeatsAllocationsClient
import { useState, useMemo, useCallback } from 'react';
import { SUPERADMIN_SEATS_MOCK_ALLOCATIONS } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_shifts_lockers_utils/SuperadminSeatsMockData';
import { SuperadminSeatsAllocation } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_types/SuperadminSeatsAllocationsTypes';
import toast from 'react-hot-toast';

export function useSuperadminSeatsAllocations() {
  const [shiftFilter, setShiftFilter] = useState('All Shifts');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const allocations = SUPERADMIN_SEATS_MOCK_ALLOCATIONS as SuperadminSeatsAllocation[];

  const filteredAllocations = useMemo(() => {
    return allocations.filter(a => {
      const matchShift = shiftFilter === 'All Shifts' || a.shift === shiftFilter;
      const matchStatus = statusFilter === 'All Statuses' || a.status === statusFilter;
      const matchFrom = !dateFrom || a.validFrom >= dateFrom;
      const matchTo = !dateTo || a.validTill <= dateTo;
      return matchShift && matchStatus && matchFrom && matchTo;
    });
  }, [allocations, shiftFilter, statusFilter, dateFrom, dateTo]);

  const handleExport = useCallback(() => {
    toast.success('Exporting allocations...');
  }, []);

  const handleRowClick = useCallback((studentName: string) => {
    toast.success(`Viewing ${studentName}`);
  }, []);

  return {
    shiftFilter,
    setShiftFilter,
    statusFilter,
    setStatusFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    filteredAllocations,
    handleExport,
    handleRowClick
  };
}
