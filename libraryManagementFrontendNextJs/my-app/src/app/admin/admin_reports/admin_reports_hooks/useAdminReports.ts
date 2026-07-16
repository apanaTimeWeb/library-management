import { useState } from 'react';
import { type AdminRecord } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import {
  ADMIN_REPORTS_KPI_CARDS,
  ADMIN_REPORTS_INCOME_VS_EXPENSE,
  ADMIN_REPORTS_SHIFT_OCCUPANCY,
  ADMIN_REPORTS_REVENUE_TREND,
  ADMIN_REPORTS_STUDENT_GROWTH,
} from '@/app/admin/admin_reports/admin_reports_constants/admin_reports_constants';
import toast from 'react-hot-toast';

export type Range = 'thisMonth' | 'last3Months' | 'thisYear';

export const RANGE_OPTIONS: { label: string; key: Range }[] = [
  { label: 'This Month',    key: 'thisMonth'    },
  { label: 'Last 3 Months', key: 'last3Months'  },
  { label: 'This Year',     key: 'thisYear'     },
];

// DATA FLOW: API → useAdminReports.ts → AdminReportsComponent
export function useAdminReports(initialData?: AdminRecord) {
  const [range, setRange] = useState<Range>('last3Months');
  const [branch, setBranch] = useState('All Branches');

  const incomeData  = (initialData?.incomeVsExpense as Record<string, unknown>)?.[range] || ADMIN_REPORTS_INCOME_VS_EXPENSE[range];
  const revenueData = (initialData?.revenueTrend as Record<string, unknown>)?.[range] || ADMIN_REPORTS_REVENUE_TREND[range];
  const growthData  = (initialData?.studentGrowth as Record<string, unknown>)?.[range] || ADMIN_REPORTS_STUDENT_GROWTH[range];
  const shiftOccupancy = (initialData?.shiftOccupancy as unknown[]) || ADMIN_REPORTS_SHIFT_OCCUPANCY;
  const kpiCards = (initialData?.kpiCards as unknown[]) || ADMIN_REPORTS_KPI_CARDS;

  function handleExport(type: 'PDF' | 'Excel') {
    toast.success(`${type} export started — file will download shortly.`, { duration: 3000 });
  }

  return {
    range,
    setRange,
    branch,
    setBranch,
    incomeData,
    revenueData,
    growthData,
    shiftOccupancy,
    kpiCards,
    handleExport,
    rangeOptions: RANGE_OPTIONS
  };
}

