import React from 'react';

interface Props {
  shiftFilter: string;
  setShiftFilter: (val: string) => void;
}

export function SuperadminShiftGapAnalyzerFilterBar({ shiftFilter, setShiftFilter }: Props) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 shadow-sm mb-6 flex items-center justify-between gap-3">
      <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-wide">Day-wise Gap Log</h3>
      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider hidden sm:block">Filter:</label>
        <select 
          className="bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md)] py-1.5 px-3 text-sm font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors shadow-inner w-40" 
          value={shiftFilter} 
          onChange={e => setShiftFilter(e.target.value)}
        >
          <option value="all">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </select>
      </div>
    </div>
  );
}
