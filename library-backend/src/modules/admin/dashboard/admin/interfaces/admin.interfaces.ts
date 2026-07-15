export interface Trend {
  value: string;
  up: boolean;
}

export interface KpiCard {
  label: string;
  value: string | number;
  trend: Trend;
  sub: string;
}

export interface SeatData {
  id: string;
  shift: string;
  status: string;
  fee: string;
  occupant?: string;
  expiry?: string;
  studentId?: string;
}

export interface RecentPayment {
  name: string;
  initials: string;
  amount: string;
  mode: string;
  timeAgo: string;
  studentId: string;
}

export interface ActionItem {
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

export interface IncomeExpenseItem {
  month: string;
  income: number;
  expense: number;
}

export interface ShiftOccupancyItem {
  name: string;
  value: number;
  color: string;
}

export interface RevenueTrendItem {
  month: string;
  revenue: number;
}

export interface StudentGrowthItem {
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
