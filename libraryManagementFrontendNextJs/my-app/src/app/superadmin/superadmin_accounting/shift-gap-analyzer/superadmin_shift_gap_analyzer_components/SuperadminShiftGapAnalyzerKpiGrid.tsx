import React from 'react';

interface Props {
  totalLoss: number;
  totalVacant: number;
  avgOccupancy: number;
  shiftsAnalyzed: number;
}

export function SuperadminShiftGapAnalyzerKpiGrid({ totalLoss, totalVacant, avgOccupancy, shiftsAnalyzed }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-[var(--danger-bg,rgba(248,113,113,0.1))] border border-danger/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-danger uppercase tracking-wider mb-1">Total Revenue Loss</p>
        <p className="text-xl font-extrabold text-danger">₹{totalLoss.toLocaleString()}</p>
      </div>
      <div className="bg-[var(--warning-bg,rgba(251,191,36,0.1))] border border-warning/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-warning uppercase tracking-wider mb-1">Total Vacant Seats</p>
        <p className="text-xl font-extrabold text-warning">{totalVacant}</p>
      </div>
      <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-text-disabled uppercase tracking-wider mb-1">Avg Occupancy</p>
        <p className="text-xl font-extrabold text-text-primary">{avgOccupancy}%</p>
      </div>
      <div className="bg-bg-input border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">Shifts Analyzed</p>
        <p className="text-xl font-extrabold text-text-secondary">{shiftsAnalyzed}</p>
      </div>
    </div>
  );
}
