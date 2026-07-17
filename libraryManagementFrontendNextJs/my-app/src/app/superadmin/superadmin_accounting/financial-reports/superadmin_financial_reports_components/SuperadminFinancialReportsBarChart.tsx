import React from 'react';
import type { SuperadminMonthlyReport } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_types/SuperadminFinancialReportsTypes';

interface Props {
  monthlyData: SuperadminMonthlyReport[];
  maxIncome: number;
}

export function SuperadminFinancialReportsBarChart({ monthlyData, maxIncome }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm">
      <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider mb-6">Monthly Income vs Expense</h3>
      
      <div className="flex items-end gap-4 h-56 overflow-x-auto pb-4 hide-scrollbar">
        {monthlyData.map(m => (
          <div key={m.month} className="flex flex-col items-center gap-2 flex-1 min-w-14 group">
            <div className="flex items-end gap-1.5 w-full justify-center h-40">
              <div
                className="w-5 rounded-t-[var(--radius-sm)] transition-all duration-500 ease-out hover:opacity-80"
                style={{ height: `${(m.income / maxIncome) * 100}%`, backgroundColor: 'var(--success)' }}
                title={`Income: ₹${m.income.toLocaleString()}`}
              />
              <div
                className="w-5 rounded-t-[var(--radius-sm)] transition-all duration-500 ease-out hover:opacity-80"
                style={{ height: `${(m.expense / maxIncome) * 100}%`, backgroundColor: 'var(--danger)' }}
                title={`Expense: ₹${m.expense.toLocaleString()}`}
              />
            </div>
            <span className="text-[11px] font-bold text-text-disabled uppercase tracking-wider group-hover:text-text-primary transition-colors">{m.month}</span>
          </div>
        ))}
      </div>
      
      <div className="flex gap-6 mt-4 justify-center border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-[var(--radius-sm)]" style={{ backgroundColor: 'var(--success)' }} />
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-[var(--radius-sm)]" style={{ backgroundColor: 'var(--danger)' }} />
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Expense</span>
        </div>
      </div>
    </div>
  );
}
