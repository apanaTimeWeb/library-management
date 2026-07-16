import React from 'react';

interface Props {
  totalAssets: number;
  totalValue: number;
  maintenanceCount: number;
  disposedCount: number;
}

export function SuperadminAssetsKpiGrid({ totalAssets, totalValue, maintenanceCount, disposedCount }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider mb-1">Total Assets</p>
        <p className="text-xl font-extrabold text-[var(--text-primary)]">{totalAssets}</p>
      </div>
      <div className="bg-[var(--success-bg,rgba(52,211,153,0.1))] border border-[var(--success)]/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--success)] uppercase tracking-wider mb-1">Current Value</p>
        <p className="text-xl font-extrabold text-[var(--success)]">₹{totalValue.toLocaleString()}</p>
      </div>
      <div className="bg-[var(--warning-bg,rgba(251,191,36,0.1))] border border-[var(--warning)]/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--warning)] uppercase tracking-wider mb-1">Under Maintenance</p>
        <p className="text-xl font-extrabold text-[var(--warning)]">{maintenanceCount}</p>
      </div>
      <div className="bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Disposed</p>
        <p className="text-xl font-extrabold text-[var(--text-secondary)]">{disposedCount}</p>
      </div>
    </div>
  );
}
