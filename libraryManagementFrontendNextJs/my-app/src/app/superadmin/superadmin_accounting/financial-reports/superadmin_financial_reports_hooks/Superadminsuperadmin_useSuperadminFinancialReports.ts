import { useState, useMemo } from 'react';
import { SUPERADMIN_MONTHLY_REPORTS_MOCK, SUPERADMIN_CATEGORY_BREAKDOWN_MOCK } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_constants/SuperadminFinancialReportsConstants';

// DATA FLOW: API → useSuperadminFinancialReports.ts → SuperadminFinancialReportsComponent
export function Superadminsuperadmin_useSuperadminFinancialReports() {
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const { totalIncome, totalExpense, netProfit } = useMemo(() => {
    const income = SUPERADMIN_MONTHLY_REPORTS_MOCK.reduce((s, m) => s + m.income, 0);
    const expense = SUPERADMIN_MONTHLY_REPORTS_MOCK.reduce((s, m) => s + m.expense, 0);
    return {
      totalIncome: income,
      totalExpense: expense,
      netProfit: income - expense
    };
  }, []);

  const maxIncome = useMemo(() => {
    return Math.max(...SUPERADMIN_MONTHLY_REPORTS_MOCK.map(m => m.income));
  }, []);

  return {
    period,
    setPeriod,
    monthlyData: SUPERADMIN_MONTHLY_REPORTS_MOCK,
    categoryBreakdown: SUPERADMIN_CATEGORY_BREAKDOWN_MOCK,
    totalIncome,
    totalExpense,
    netProfit,
    maxIncome
  };
}
