// RESPONSIBILITY: Renders the SuperadminFinancialReportsKpiCards component.
import React from 'react';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';

import type { SuperadminFinancialReportsKpiCardsProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminFinancialReportsKpiCards({ totalIncome, totalExpense, netProfit }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-success-bg border border-success/20 rounded-lg p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-success uppercase tracking-wider">Total Income</p>
          <TrendingUp size={16} className="text-success" />
        </div>
        <p className="text-text-primary text-xl font-extrabold text-success tracking-tight">₹{totalIncome.toLocaleString()}</p>
      </div>
      
      <div className="bg-danger-bg border border-danger/20 rounded-lg p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-danger uppercase tracking-wider">Total Expenses</p>
          <TrendingDown size={16} className="text-danger" />
        </div>
        <p className="text-text-primary text-xl font-extrabold text-danger tracking-tight">₹{totalExpense.toLocaleString()}</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-text-disabled uppercase tracking-wider">Net Profit</p>
          <BarChart2 size={16} className="text-text-disabled" />
        </div>
        <p className={`text-text-primary text-xl font-extrabold tracking-tight ${netProfit >= 0 ? 'text-success' : 'text-danger'}`}>
          ₹{netProfit.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

