// RESPONSIBILITY: Renders the SuperadminAssetsKpiGrid component.
import React from 'react';

import type { SuperadminAssetsKpiGridProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminAssetsKpiGrid({ totalAssets, totalValue, maintenanceCount, disposedCount }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-text-disabled uppercase tracking-wider mb-1">Total Assets</p>
        <p className="text-xl font-extrabold text-text-primary">{totalAssets}</p>
      </div>
      <div className="bg-success-bg border border-success/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-success uppercase tracking-wider mb-1">Current Value</p>
        <p className="text-xl font-extrabold text-success">₹{totalValue.toLocaleString()}</p>
      </div>
      <div className="bg-warning-bg border border-warning/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-warning uppercase tracking-wider mb-1">Under Maintenance</p>
        <p className="text-xl font-extrabold text-warning">{maintenanceCount}</p>
      </div>
      <div className="bg-bg-input border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">Disposed</p>
        <p className="text-xl font-extrabold text-text-secondary">{disposedCount}</p>
      </div>
    </div>
  );
}

