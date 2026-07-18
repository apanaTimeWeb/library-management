// Types for superadmin_accounting module

import type { SuperadminDayGap, SuperadminShiftGap } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_types/SuperadminShiftGapAnalyzerTypes';
import type { SuperadminGapRow } from '@/app/superadmin/superadmin_accounting/seat-gap-report/superadmin_seat_gap_report_types/SuperadminSeatGapReportTypes';
import type { SuperadminCategoryBreakdown, SuperadminMonthlyReport } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_types/SuperadminFinancialReportsTypes';
import type { SuperadminExpense, SuperadminExpenseMode } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_types/SuperadminExpensesTypes';
import type { SuperadminExpenseCategory } from '@/app/superadmin/superadmin_accounting/expense-categories/superadmin_expense_categories_types/SuperadminExpenseCategoriesTypes';
import type { SuperadminAsset } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_types/SuperadminAssetsTypes';
import type { SuperadminDailySettlementEntry } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_types/SuperadminDailySettlementTypes';
import type { SuperadminMaintenanceLog } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_types/SuperadminAssetMaintenanceTypes';


export interface SuperadminShiftGapAnalyzerTableProps {
  days: SuperadminDayGap[];
}
export interface SuperadminShiftGapAnalyzerSummaryCardsProps {
  shifts: SuperadminShiftGap[];
}
export interface SuperadminShiftGapAnalyzerKpiGridProps {
  totalLoss: number;
  totalVacant: number;
  avgOccupancy: number;
  shiftsAnalyzed: number;
}
export interface SuperadminShiftGapAnalyzerFilterBarProps {
  shiftFilter: string;
  setShiftFilter: (val: string) => void;
}
export interface SuperadminSeatGapReportTableProps {
  rows: SuperadminGapRow[];
}
export interface SuperadminSeatGapReportKpiGridProps {
  totalGapSeats: number;
  totalLoss: number;
  avgGapDays: number;
  maintenanceCount: number;
}
export interface SuperadminSeatGapReportFilterBarProps {
  shiftFilter: string;
  setShiftFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onExport: () => Promise<void>;
}
export interface SuperadminFinancialReportsKpiCardsProps {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
}
export interface SuperadminFinancialReportsHeaderProps {
  period: 'monthly' | 'quarterly' | 'yearly';
  setPeriod: (val: 'monthly' | 'quarterly' | 'yearly') => void;
}
export interface SuperadminFinancialReportsBreakdownProps {
  categoryBreakdown: SuperadminCategoryBreakdown[];
}
export interface SuperadminFinancialReportsBarChartProps {
  monthlyData: SuperadminMonthlyReport[];
  maxIncome: number;
}
export interface SuperadminExpensesKpiGridProps {
  allExpenses: SuperadminExpense[];
  visibleExpenses: SuperadminExpense[];
}
export interface SuperadminExpensesHeaderProps {
  onAddClick: () => void;
}
export interface SuperadminExpensesGridProps {
  expenses: SuperadminExpense[];
  onDelete: (id: number) => void;
}
export interface SuperadminExpensesFilterBarProps {
  categories: string[];
  catFilter: string;
  setCatFilter: (val: string) => void;
}
export interface SuperadminExpensesAddDialogProps {
  categories: string[];
  onClose: () => void;
  onSave: (exp: Omit<SuperadminExpense, 'id'>) => Promise<void>;
}
export interface SuperadminExpenseCategoriesHeaderProps {
  onAddClick: () => void;
}
export interface SuperadminExpenseCategoriesCardProps {
  category: SuperadminExpenseCategory;
  onDelete: (id: number) => void;
}
export interface SuperadminExpenseCategoriesAddDialogProps {
  availableColors: string[];
  onClose: () => void;
  onSave: (category: Omit<SuperadminExpenseCategory, 'id' | 'spent'>) => Promise<void>;
}
export interface SuperadminAssetsAddDialogProps {
  categories: string[];
  onClose: () => void;
  onSave: (asset: Omit<SuperadminAsset, 'id' | 'status' | 'currentValue'>) => Promise<void>;
}
export interface SuperadminAssetsHeaderProps {
  onAddClick: () => void;
}
export interface SuperadminAssetsTableProps {
  assets: SuperadminAsset[];
}
export interface SuperadminAssetsKpiGridProps {
  totalAssets: number;
  totalValue: number;
  maintenanceCount: number;
  disposedCount: number;
}
export interface SuperadminAssetsFilterBarProps {
  categories: string[];
  catFilter: string;
  setCatFilter: (val: string) => void;
}
export interface SuperadminDailySettlementGridProps {
  entries: SuperadminDailySettlementEntry[];
  onSettle: (id: number) => void;
}
export interface SuperadminDailySettlementHeaderProps {
  date: string;
  setDate: (val: string) => void;
}
export interface SuperadminDailySettlementKpiGridProps {
  totalCash: number;
  totalUpi: number;
  totalExp: number;
}
export interface SuperadminAssetMaintenanceTableProps {
  logs: SuperadminMaintenanceLog[];
  onComplete: (id: number) => void;
}
export interface SuperadminAssetMaintenanceKpiGridProps {
  pendingCount: number;
  inProgressCount: number;
  completedCount: number;
  totalCost: number;
}
export interface SuperadminAssetMaintenanceHeaderProps {
  onAddClick: () => void;
}
export interface SuperadminAssetMaintenanceFilterBarProps {
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}
export interface SuperadminAssetMaintenanceAddDialogProps {
  onClose: () => void;
  onSave: (log: Omit<SuperadminMaintenanceLog, 'id' | 'status'>) => Promise<void>;
}

// shift-gap-analyzer
// seat-gap-report
// financial-reports
// expenses
// expense-categories
// assets
// daily-settlement
// asset-maintenance
