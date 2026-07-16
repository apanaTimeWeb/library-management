export interface AdminTrend {
  value: string;
  up: boolean;
}

export interface AdminKpiCard {
  label: string;
  value: string | number;
  trend: Trend;
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
  kpiCards: KpiCard[];
  seats: SeatData[];
  shifts: string[];
  actionItems: ActionItem[];
  recentPayments: RecentPayment[];
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
  kpiCards: KpiCard[];
  incomeVsExpense: {
    thisMonth: IncomeExpenseItem[];
    last3Months: IncomeExpenseItem[];
    thisYear: IncomeExpenseItem[];
  };
  shiftOccupancy: ShiftOccupancyItem[];
  revenueTrend: {
    thisMonth: RevenueTrendItem[];
    last3Months: RevenueTrendItem[];
    thisYear: RevenueTrendItem[];
  };
  studentGrowth: {
    thisMonth: StudentGrowthItem[];
    last3Months: StudentGrowthItem[];
    thisYear: StudentGrowthItem[];
  };
}
