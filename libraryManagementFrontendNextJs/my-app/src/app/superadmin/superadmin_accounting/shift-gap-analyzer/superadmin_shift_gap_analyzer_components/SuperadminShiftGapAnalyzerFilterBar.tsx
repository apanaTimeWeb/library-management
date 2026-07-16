import React from 'react';

interface Props {
  shiftFilter: string;
  setShiftFilter: (val: string) => void;
}

export function SuperadminShiftGapAnalyzerFilterBar({ shiftFilter, setShiftFilter }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm mb-6 flex items-center justify-between gap-3">
      <h3 className="text-sm font-bold text-text-primary tracking-wide">Day-wise Gap Log</h3>
      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider hidden sm:block">Filter:</label>
        <select 
          className="bg-bg-input border border-border rounded-[var(--radius-md)] py-1.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner w-40" 
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
