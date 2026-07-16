import React from 'react';

interface Props {
  date: string;
  setDate: (val: string) => void;
}

export function SuperadminDailySettlementHeader({ date, setDate }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Daily Settlement</h1>
        <p className="text-sm font-medium text-text-secondary">Shift-wise cash & UPI reconciliation.</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Settlement Date</label>
        <input 
          type="date" 
          className="w-full sm:w-44 bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
        />
      </div>
    </div>
  );
}
