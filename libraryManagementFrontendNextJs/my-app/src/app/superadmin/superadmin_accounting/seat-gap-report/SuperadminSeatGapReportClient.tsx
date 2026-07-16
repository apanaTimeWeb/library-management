'use client';
import React, { useState } from 'react';
import { useSuperadminSeatGapReport } from '@/app/superadmin/superadmin_accounting/seat-gap-report/superadmin_seat_gap_report_hooks/superadmin_useSuperadminSeatGapReport';
import { SuperadminSeatGapReportHeader } from '@/app/superadmin/superadmin_accounting/seat-gap-report/superadmin_seat_gap_report_components/SuperadminSeatGapReportHeader';
import { SuperadminSeatGapReportKpiGrid } from '@/app/superadmin/superadmin_accounting/seat-gap-report/superadmin_seat_gap_report_components/SuperadminSeatGapReportKpiGrid';
import { SuperadminSeatGapReportFilterBar } from '@/app/superadmin/superadmin_accounting/seat-gap-report/superadmin_seat_gap_report_components/SuperadminSeatGapReportFilterBar';
import { SuperadminSeatGapReportTable } from '@/app/superadmin/superadmin_accounting/seat-gap-report/superadmin_seat_gap_report_components/SuperadminSeatGapReportTable';

export function SuperadminSeatGapReportClient() {
  const { 
    visibleRows,
    shiftFilter,
    setShiftFilter,
    statusFilter,
    setStatusFilter,
    totalGapSeats,
    totalLoss,
    avgGapDays,
    maintenanceCount,
    handleExport
  } = useSuperadminSeatGapReport();

  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const onExportReport = async () => {
    await handleExport();
    showToast('✅ Report exported successfully');
  };

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-bg-card border border-border shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-text-primary">{toast}</span>
        </div>
      )}

      <SuperadminSeatGapReportHeader />
      
      <SuperadminSeatGapReportKpiGrid 
        totalGapSeats={totalGapSeats} 
        totalLoss={totalLoss} 
        avgGapDays={avgGapDays} 
        maintenanceCount={maintenanceCount} 
      />
      
      <SuperadminSeatGapReportFilterBar 
        shiftFilter={shiftFilter} 
        setShiftFilter={setShiftFilter} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
        onExport={onExportReport}
      />
      
      <SuperadminSeatGapReportTable rows={visibleRows} />
    </div>
  );
}
