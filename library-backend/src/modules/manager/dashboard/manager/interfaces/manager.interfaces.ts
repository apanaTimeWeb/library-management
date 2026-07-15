export interface DashboardKpi {
  title: string;
  value: string;
  icon: string;
  iconClass: string;
  trend: string;
}

export interface SeatData {
  id: string;
  status: string;
}

export interface ActionItem {
  title: string;
  count: number;
  countClass: string;
  href: string;
  showRenew: boolean;
}

export interface RecentAdmission {
  id: string;
  name: string;
  smartId: string;
  shift: string;
}

export interface DashboardResponse {
  kpiData: DashboardKpi[];
  seatData: SeatData[];
  actionItems: ActionItem[];
  recentAdmissions: RecentAdmission[];
  recentEnquiries: any[];
}

// Interfaces for getReportsData()
export interface ReportsOccupancy {
  name: string;
  value: number;
}

export interface ReportsGrowth {
  date: string;
  joined: number;
  exited: number;
}

export interface ReportsAttendance {
  day: string;
  avg: number;
}

export interface ReportsAbsenteesChart {
  name: string;
  absences: number;
}

export interface ReportsComplaints {
  name: string;
  value: number;
}

export interface AbsenteeRow {
  name: string;
  smartId: string;
  shift: string;
  daysAbsent: number;
  lastPresent: string;
}

export interface ConversionRow {
  month: string;
  newEnq: number;
  converted: number;
  rate: string;
}

export interface SeatRow {
  shift: string;
  occupancy: string;
  avgDuration: string;
}

export interface LockerRow {
  type: string;
  occupied: number;
  total: number;
  pct: string;
}

export interface MaintenanceRow {
  item: string;
  location: string;
  reported: string;
  priority: string;
}

export interface ReportsResponse {
  kpiCards: any[];
  occupancyData: ReportsOccupancy[];
  growthData: ReportsGrowth[];
  attendanceData: ReportsAttendance[];
  absenteesChartData: ReportsAbsenteesChart[];
  complaintsData: ReportsComplaints[];
  absenteeRows: AbsenteeRow[];
  conversionRows: ConversionRow[];
  seatRows: SeatRow[];
  lockerRows: LockerRow[];
  maintenanceRows: MaintenanceRow[];
}

// Interfaces for getStudentReportsData()
export interface StudentReportsKpiCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  trend: string;
}

export interface StudentReportsResponse {
  kpiCards: StudentReportsKpiCard[];
  shiftOccupancyData: any[];
  studentGrowthData: any[];
  attendanceTrendData: any[];
  topAbsenteesData: any[];
  complaintStatusData: any[];
  absenteeReportData: any[];
  enquiryConversionData: any[];
  seatUtilizationData: any[];
  lockerUtilizationData: any[];
  maintenanceData: any[];
}
