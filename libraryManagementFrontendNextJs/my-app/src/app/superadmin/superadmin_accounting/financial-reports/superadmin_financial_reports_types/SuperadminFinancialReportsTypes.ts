// RESPONSIBILITY: Renders or handles logic for SuperadminFinancialReportsTypes.ts.


export interface SuperadminMonthlyReport {
  month: string;
  income: number;
  expense: number;
}
export interface SuperadminCategoryBreakdown {
  category: string;
  amount: number;
  pct: number;
}

