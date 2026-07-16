import React from 'react';

interface Props {
  period: 'monthly' | 'quarterly' | 'yearly';
  setPeriod: (val: 'monthly' | 'quarterly' | 'yearly') => void;
}

export function SuperadminFinancialReportsHeader({ period, setPeriod }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Financial Reports</h1>
        <p className="text-sm font-medium text-text-secondary">Income vs expense overview and category breakdown.</p>
      </div>
      <div className="flex bg-bg-input rounded-[var(--radius-md)] p-1 border border-border shadow-inner w-fit">
        {(['monthly', 'quarterly', 'yearly'] as const).map(p => (
          <button 
            key={p} 
            onClick={() => setPeriod(p)} 
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-[var(--radius-sm)] transition-all duration-200 ${period === p ? 'bg-bg-card text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
