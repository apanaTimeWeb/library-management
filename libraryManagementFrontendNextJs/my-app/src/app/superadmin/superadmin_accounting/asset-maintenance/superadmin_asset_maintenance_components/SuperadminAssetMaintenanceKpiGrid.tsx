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
      <div className="bg-[var(--warning-bg,rgba(251,191,36,0.1))] border border-[var(--warning)]/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--warning)] uppercase tracking-wider mb-1">Pending</p>
        <p className="text-xl font-extrabold text-[var(--warning)]">{pendingCount}</p>
      </div>
      <div className="bg-[var(--info-bg,rgba(59,130,246,0.1))] border border-[var(--info,#3B82F6)]/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--info,#3B82F6)] uppercase tracking-wider mb-1">In Progress</p>
        <p className="text-xl font-extrabold text-[var(--info,#3B82F6)]">{inProgressCount}</p>
      </div>
      <div className="bg-[var(--success-bg,rgba(52,211,153,0.1))] border border-[var(--success)]/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--success)] uppercase tracking-wider mb-1">Completed</p>
        <p className="text-xl font-extrabold text-[var(--success)]">{completedCount}</p>
      </div>
      <div className="bg-[var(--danger-bg,rgba(248,113,113,0.1))] border border-[var(--danger)]/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--danger)] uppercase tracking-wider mb-1">Total Cost</p>
        <p className="text-xl font-extrabold text-[var(--danger)]">₹{totalCost.toLocaleString()}</p>
      </div>
    </div>
  );
}
