import { useUrlState } from '@/app/admin/admin_shared_hooks/useUrlState';
// RESPONSIBILITY: Renders the useAdminReports.ts component/hook.
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
export function useAdminReports(initialData?: Record<string, Record<string, unknown[]>>) {
  const [range, setRange] = useState<Range>('last3Months');
  const [branch, setBranch] = useUrlState('branch', 'All Branches' as string);

  const incomeData: Record<string, unknown>[]  = (initialData?.incomeVsExpense?.[range as string] || ADMIN_REPORTS_INCOME_VS_EXPENSE[range as keyof typeof ADMIN_REPORTS_INCOME_VS_EXPENSE]) as Record<string, unknown>[];
  const revenueData: Record<string, unknown>[] = (initialData?.revenueTrend?.[range as string] || ADMIN_REPORTS_REVENUE_TREND[range as keyof typeof ADMIN_REPORTS_REVENUE_TREND]) as Record<string, unknown>[];
  const growthData: Record<string, unknown>[]  = (initialData?.studentGrowth?.[range as string] || ADMIN_REPORTS_STUDENT_GROWTH[range as keyof typeof ADMIN_REPORTS_STUDENT_GROWTH]) as Record<string, unknown>[];
  const shiftOccupancy: Record<string, unknown>[] = (initialData?.shiftOccupancy as Record<string, unknown>[] | undefined || ADMIN_REPORTS_SHIFT_OCCUPANCY) as Record<string, unknown>[];
  const kpiCards: Record<string, unknown>[] = (initialData?.kpiCards as Record<string, unknown>[] | undefined || ADMIN_REPORTS_KPI_CARDS) as Record<string, unknown>[];

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


