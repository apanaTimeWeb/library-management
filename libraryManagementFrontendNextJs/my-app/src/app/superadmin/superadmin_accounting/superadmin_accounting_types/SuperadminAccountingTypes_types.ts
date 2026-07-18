import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
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
