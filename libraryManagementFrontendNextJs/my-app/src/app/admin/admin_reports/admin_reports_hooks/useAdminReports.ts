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
export function useAdminReports(initialData?: any) {
  const [range, setRange] = useState<Range>('last3Months');
  const [branch, setBranch] = useState('All Branches');

  const incomeData: any[]  = (initialData?.incomeVsExpense?.[range] || ADMIN_REPORTS_INCOME_VS_EXPENSE[range]) as any[];
  const revenueData: any[] = (initialData?.revenueTrend?.[range] || ADMIN_REPORTS_REVENUE_TREND[range]) as any[];
  const growthData: any[]  = (initialData?.studentGrowth?.[range] || ADMIN_REPORTS_STUDENT_GROWTH[range]) as any[];
  const shiftOccupancy: any[] = (initialData?.shiftOccupancy || ADMIN_REPORTS_SHIFT_OCCUPANCY) as any[];
  const kpiCards: any[] = (initialData?.kpiCards || ADMIN_REPORTS_KPI_CARDS) as any[];

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

