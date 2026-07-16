import React from 'react';
import type { SuperadminCategoryBreakdown } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_types/SuperadminFinancialReportsTypes';

interface Props {
  categoryBreakdown: SuperadminCategoryBreakdown[];
}

export function SuperadminFinancialReportsBreakdown({ categoryBreakdown }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider mb-6">Expense Category Breakdown</h3>
      
      <div className="flex flex-col gap-5 flex-1">
        {categoryBreakdown.map(c => (
          <div key={c.category} className="group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-text-secondary group-hover:text-text-primary transition-colors">{c.category}</span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-extrabold text-text-primary">₹{c.amount.toLocaleString()}</span>
                <span className="text-[11px] font-bold text-text-disabled uppercase tracking-wider">({c.pct}%)</span>
              </div>
            </div>
            <div className="h-2 w-full bg-bg-input rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${c.pct}%`, backgroundColor: 'var(--primary)' }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
