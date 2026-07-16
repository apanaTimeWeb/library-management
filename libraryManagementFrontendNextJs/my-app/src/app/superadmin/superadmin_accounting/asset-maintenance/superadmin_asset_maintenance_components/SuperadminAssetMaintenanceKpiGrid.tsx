import React from 'react';

interface Props {
  pendingCount: number;
  inProgressCount: number;
  completedCount: number;
  totalCost: number;
}

export function SuperadminAssetMaintenanceKpiGrid({ pendingCount, inProgressCount, completedCount, totalCost }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-warning-bg border border-warning/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-warning uppercase tracking-wider mb-1">Pending</p>
        <p className="text-xl font-extrabold text-warning">{pendingCount}</p>
      </div>
      <div className="bg-info-bg border border-info/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-info,#3B82F6 uppercase tracking-wider mb-1">In Progress</p>
        <p className="text-xl font-extrabold text-info,#3B82F6">{inProgressCount}</p>
      </div>
      <div className="bg-success-bg border border-success/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-success uppercase tracking-wider mb-1">Completed</p>
        <p className="text-xl font-extrabold text-success">{completedCount}</p>
      </div>
      <div className="bg-danger-bg border border-danger/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-danger uppercase tracking-wider mb-1">Total Cost</p>
        <p className="text-xl font-extrabold text-danger">₹{totalCost.toLocaleString()}</p>
      </div>
    </div>
  );
}

