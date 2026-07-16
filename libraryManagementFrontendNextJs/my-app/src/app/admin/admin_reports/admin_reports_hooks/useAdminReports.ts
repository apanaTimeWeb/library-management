import { useState } from 'react';
import toast from 'react-hot-toast';

export type Range = 'thisMonth' | 'last3Months' | 'thisYear';

export const RANGE_OPTIONS: { label: string; key: Range }[] = [
  { label: 'This Month',    key: 'thisMonth'    },
  { label: 'Last 3 Months', key: 'last3Months'  },
  { label: 'This Year',     key: 'thisYear'     },
];

// DATA FLOW: API → useAdminReports.ts → AdminReportsComponent
export function useAdminReports(initialData: unknown) {
  const [range, setRange] = useState<Range>('last3Months');
  const [branch, setBranch] = useState('All Branches');

  const incomeData  = initialData?.incomeVsExpense?.[range] || [];
  const revenueData = initialData?.revenueTrend?.[range] || [];
  const growthData  = initialData?.studentGrowth?.[range] || [];
  const shiftOccupancy = initialData?.shiftOccupancy || [];
  const kpiCards = initialData?.kpiCards || [];

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
