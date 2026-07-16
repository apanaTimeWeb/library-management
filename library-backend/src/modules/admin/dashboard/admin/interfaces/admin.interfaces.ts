export interface AdminTrend {
  value: string;
  up: boolean;
}

export interface AdminKpiCard {
  label: string;
  value: string | number;
  trend: AdminTrend;
  sub: string;
}

export interface AdminSeatData {
  id: string;
  shift: string;
  status: string;
  fee: string;
  occupant?: string;
  expiry?: string;
  studentId?: string;
}

export interface AdminRecentPayment {
  name: string;
  initials: string;
  amount: string;
  mode: string;
  timeAgo: string;
  studentId: string;
}

export interface AdminActionItem {
  label: string;
  count: number;
  type: string;
  href: string;
}

export interface AdminDashboardData {
  kpiCards: AdminKpiCard[];
  seats: AdminSeatData[];
  shifts: string[];
  actionItems: AdminActionItem[];
  recentPayments: AdminRecentPayment[];
}

export interface AdminIncomeExpenseItem {
  month: string;
  income: number;
  expense: number;
}

export interface AdminShiftOccupancyItem {
  name: string;
  value: number;
  color: string;
}

export interface AdminRevenueTrendItem {
  month: string;
  revenue: number;
}

export interface AdminStudentGrowthItem {
  month: string;
  joined: number;
  exited: number;
}

export interface AdminReportsData {
  kpiCards: AdminKpiCard[];
  incomeVsExpense: {
    thisMonth: AdminIncomeExpenseItem[];
    last3Months: AdminIncomeExpenseItem[];
    thisYear: AdminIncomeExpenseItem[];
  };
  shiftOccupancy: AdminShiftOccupancyItem[];
  revenueTrend: {
    thisMonth: AdminRevenueTrendItem[];
    last3Months: AdminRevenueTrendItem[];
    thisYear: AdminRevenueTrendItem[];
  };
  studentGrowth: {
    thisMonth: AdminStudentGrowthItem[];
    last3Months: AdminStudentGrowthItem[];
    thisYear: AdminStudentGrowthItem[];
  };
}
