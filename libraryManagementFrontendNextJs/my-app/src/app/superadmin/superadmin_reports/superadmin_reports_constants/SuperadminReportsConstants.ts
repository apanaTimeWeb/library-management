import type { SuperadminReportsDataResponse } from '@/app/superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes';

export const SUPERADMIN_REPORTS_DATE_RANGES = ['This Month', 'Last 3 Months', 'Last 6 Months', 'This Year'];

export const SUPERADMIN_REPORTS_MOCK_DATA: SuperadminReportsDataResponse = {
  revenueExpense: [
    { month: 'Nov', Revenue: 142000, Expenses: 45000 },
    { month: 'Dec', Revenue: 158000, Expenses: 52000 },
    { month: 'Jan', Revenue: 134000, Expenses: 41000 },
    { month: 'Feb', Revenue: 172000, Expenses: 58000 },
    { month: 'Mar', Revenue: 196000, Expenses: 61000 },
    { month: 'Apr', Revenue: 214000, Expenses: 67000 },
  ],
  revenueTrend: [
    { month: 'May', Revenue: 88000  }, { month: 'Jun', Revenue: 97000  },
    { month: 'Jul', Revenue: 112000 }, { month: 'Aug', Revenue: 125000 },
    { month: 'Sep', Revenue: 138000 }, { month: 'Oct', Revenue: 119000 },
    { month: 'Nov', Revenue: 142000 }, { month: 'Dec', Revenue: 158000 },
    { month: 'Jan', Revenue: 134000 }, { month: 'Feb', Revenue: 172000 },
    { month: 'Mar', Revenue: 196000 }, { month: 'Apr', Revenue: 214000 },
  ],
  studentGrowth: [
    { month: 'Nov', Joined: 320, Exited: 85  },
    { month: 'Dec', Joined: 410, Exited: 110 },
    { month: 'Jan', Joined: 280, Exited: 70  },
    { month: 'Feb', Joined: 490, Exited: 130 },
    { month: 'Mar', Joined: 520, Exited: 95  },
    { month: 'Apr', Joined: 380, Exited: 88  },
  ],
  occupancy: [
    { name: 'Morning',     value: 42 },
    { name: 'Afternoon',   value: 31 },
    { name: 'Evening',     value: 18 },
    { name: 'Unallocated', value: 9  },
  ],
  kpiCards: [
    { label: 'Total Revenue This Month', value: '₹2,14,000', iconType: 'primary', icon: 'rupee', trend: '+18% vs last month', trendType: 'up' },
    { label: 'Total Expenses',           value: '₹67,000',   iconType: 'danger',  icon: 'trending_down', trend: '+9% vs last month',  trendType: 'down' },
    { label: 'Net Profit',               value: '₹1,47,000', iconType: 'success', icon: 'trending_up', trend: '+22% vs last month', trendType: 'up' },
    { label: 'Active Libraries',         value: '38',         iconType: 'warning', icon: 'users', trend: '+4 this month',      trendType: 'up' },
  ]
};
