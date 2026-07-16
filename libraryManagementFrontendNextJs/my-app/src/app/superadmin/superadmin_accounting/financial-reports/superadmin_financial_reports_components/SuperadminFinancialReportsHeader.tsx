import React from 'react';

interface Props {
  period: 'monthly' | 'quarterly' | 'yearly';
  setPeriod: (val: 'monthly' | 'quarterly' | 'yearly') => void;
}

export function SuperadminFinancialReportsHeader({ period, setPeriod }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Financial Reports</h1>
        <p className="text-sm font-medium text-[var(--text-secondary)]">Income vs expense overview and category breakdown.</p>
      </div>
      <div className="flex bg-[var(--bg-input)] rounded-[var(--radius-md)] p-1 border border-[var(--border)] shadow-inner w-fit">
        {(['monthly', 'quarterly', 'yearly'] as const).map(p => (
          <button 
            key={p} 
            onClick={() => setPeriod(p)} 
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-[var(--radius-sm)] transition-all duration-200 ${period === p ? 'bg-[var(--bg-card)] text-[var(--primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
