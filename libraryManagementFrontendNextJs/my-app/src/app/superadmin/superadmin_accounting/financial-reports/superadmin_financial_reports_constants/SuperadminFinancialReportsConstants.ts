import type { SuperadminMonthlyReport, SuperadminCategoryBreakdown } from '../superadmin_financial_reports_types/SuperadminFinancialReportsTypes';

export const SUPERADMIN_MONTHLY_REPORTS_MOCK: SuperadminMonthlyReport[] = [
  { month: 'Oct', income: 42000, expense: 18000 },
  { month: 'Nov', income: 38000, expense: 15000 },
  { month: 'Dec', income: 51000, expense: 22000 },
  { month: 'Jan', income: 47000, expense: 19000 },
  { month: 'Feb', income: 44000, expense: 17000 },
  { month: 'Mar', income: 56000, expense: 21000 },
  { month: 'Apr', income: 61000, expense: 24000 },
];

export const SUPERADMIN_CATEGORY_BREAKDOWN_MOCK: SuperadminCategoryBreakdown[] = [
  { category: 'Electricity',   amount: 4200,  pct: 17 },
  { category: 'Maintenance',   amount: 3600,  pct: 15 },
  { category: 'Internet',      amount: 2200,  pct: 9  },
  { category: 'Salary',        amount: 12000, pct: 50 },
  { category: 'Miscellaneous', amount: 2200,  pct: 9  },
];
