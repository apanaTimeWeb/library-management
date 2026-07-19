// RESPONSIBILITY: Renders the SuperadminSeatGapReportKpiGrid component.
import React from 'react';

import type { SuperadminSeatGapReportKpiGridProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminSeatGapReportKpiGrid({ totalGapSeats, totalLoss, avgGapDays, maintenanceCount }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-danger-bg border border-danger/20 rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-danger uppercase tracking-wider mb-1">Total Gap Seats</p>
        <p className="text-xl font-extrabold text-danger">{totalGapSeats}</p>
      </div>
      <div className="bg-warning-bg border border-warning/20 rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-warning uppercase tracking-wider mb-1">Revenue Loss</p>
        <p className="text-xl font-extrabold text-warning">₹{totalLoss.toLocaleString()}</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-text-disabled uppercase tracking-wider mb-1">Avg Gap Days</p>
        <p className="text-xl font-extrabold text-text-primary">{avgGapDays}</p>
      </div>
      <div className="bg-input border border-border rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Under Maintenance</p>
        <p className="text-xl font-extrabold text-text-secondary">{maintenanceCount}</p>
      </div>
    </div>
  );
}

