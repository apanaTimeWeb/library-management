import React from 'react';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
}

export function SuperadminFinancialReportsKpiCards({ totalIncome, totalExpense, netProfit }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-[var(--success-bg,rgba(52,211,153,0.1))] border border-[var(--success)]/20 rounded-[var(--radius-lg)] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-bold text-[var(--success)] uppercase tracking-wider">Total Income</p>
          <TrendingUp size={16} className="text-[var(--success)]" />
        </div>
        <p className="text-2xl font-extrabold text-[var(--success)] tracking-tight">₹{totalIncome.toLocaleString()}</p>
      </div>
      
      <div className="bg-[var(--danger-bg,rgba(248,113,113,0.1))] border border-[var(--danger)]/20 rounded-[var(--radius-lg)] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-bold text-[var(--danger)] uppercase tracking-wider">Total Expenses</p>
          <TrendingDown size={16} className="text-[var(--danger)]" />
        </div>
        <p className="text-2xl font-extrabold text-[var(--danger)] tracking-tight">₹{totalExpense.toLocaleString()}</p>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Net Profit</p>
          <BarChart2 size={16} className="text-[var(--text-disabled)]" />
        </div>
        <p className={`text-2xl font-extrabold tracking-tight ${netProfit >= 0 ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
          ₹{netProfit.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
