import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';
import type { AdminDashboardData, AdminDashboardSeatData } from '@/app/admin/admin_dashboard/admin_dashboard_types/admin_dashboard_types';

export function useAdminDashboard(initialData: AdminDashboardData) {
  const router = useRouter();
  
  // States for Seat Matrix
  const [activeShift, setActiveShift] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  const [appliedFee, setAppliedFee] = useState('All');
  const [appliedShift, setAppliedShift] = useState('All');

  const handleSeatClick = (seat: AdminDashboardSeatData) => {
    if (seat.status === 'occupied' || seat.status === 'expiring') {
      router.push(seat.studentId ? `${ADMIN_ROUTES.STUDENTS}/${seat.studentId}` : ADMIN_ROUTES.STUDENTS);
    } else if (seat.status === 'free') {
      router.push(`${ADMIN_ROUTES.STUDENTS}/new`);
    }
  };

  const handleApplyFilters = () => {
    setAppliedFee(feeFilter);
  };

  const handleClearFilters = () => {
    setAppliedFee('All');
    setAppliedShift('All');
    setFeeFilter('All');
    setActiveShift('All');
  };

  return {
    data: initialData,
    seatMatrixState: {
      activeShift, setActiveShift,
      feeFilter, setFeeFilter,
      appliedFee, setAppliedFee,
      appliedShift, setAppliedShift,
      handleSeatClick,
      handleApplyFilters,
      handleClearFilters
    }
  };
}
