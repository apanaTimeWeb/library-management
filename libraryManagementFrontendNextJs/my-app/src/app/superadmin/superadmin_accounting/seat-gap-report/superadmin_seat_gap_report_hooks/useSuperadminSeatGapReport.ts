import { useState, useMemo } from 'react';
import type { SuperadminGapRow } from '@/app/superadmin/superadmin_accounting/seat-gap-report/superadmin_seat_gap_report_types/SuperadminSeatGapReportTypes';
import { SUPERADMIN_SEAT_GAP_REPORT_MOCK_DATA, SUPERADMIN_SEAT_GAP_REPORT_STATUS_STYLES } from '@/app/superadmin/superadmin_accounting/seat-gap-report/superadmin_seat_gap_report_constants/SuperadminSeatGapReportConstants';

// DATA FLOW: API → useSuperadminSeatGapReport.ts → SuperadminSeatGapReportComponent
export function useSuperadminSeatGapReport() {
  const [shiftFilter, setShiftFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const visibleRows = useMemo(() => {
    return SUPERADMIN_SEAT_GAP_REPORT_MOCK_DATA.filter(r =>
      (shiftFilter === 'all' || r.shift === shiftFilter) &&
      (statusFilter === 'all' || r.status === statusFilter)
    );
  }, [shiftFilter, statusFilter]);

  const { totalLoss, avgGapDays, maintenanceCount, totalGapSeats } = useMemo(() => {
    const totalGap = SUPERADMIN_SEAT_GAP_REPORT_MOCK_DATA.length;
    const loss = visibleRows.reduce((s, r) => s + r.revenueLoss, 0);
    const sumGapDays = SUPERADMIN_SEAT_GAP_REPORT_MOCK_DATA.reduce((s, r) => s + r.gapDays, 0);
    const avgDays = totalGap > 0 ? Math.round(sumGapDays / totalGap) : 0;
    const maintenance = SUPERADMIN_SEAT_GAP_REPORT_MOCK_DATA.filter(r => r.status === 'maintenance').length;

    return {
      totalGapSeats: totalGap,
      totalLoss: loss,
      avgGapDays: avgDays,
      maintenanceCount: maintenance
    };
  }, [visibleRows]);

  const handleExport = async () => {
    // Simulate export delay
    await new Promise(res => setTimeout(res, 800));
  };

  return {
    visibleRows,
    shiftFilter,
    setShiftFilter,
    statusFilter,
    setStatusFilter,
    totalGapSeats,
    totalLoss,
    avgGapDays,
    maintenanceCount,
    handleExport,
    statusStyles: SUPERADMIN_SEAT_GAP_REPORT_STATUS_STYLES
  };
}
