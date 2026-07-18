

export interface ManagerReportsKpiCard {
  title: string;
  value: string | number;
  icon: string;
  iconClass: string;
  trend?: string;
}
export interface ManagerReportsOccupancyData {
  name: string;
  value: number;
}
export interface ManagerReportsGrowthData {
  date: string;
  joined: number;
  exited: number;
}
export interface ManagerReportsAttendanceData {
  day: string;
  avg: number;
}
export interface ManagerReportsAbsenteeChartData {
  name: string;
  absences: number;
}
export interface ManagerReportsComplaintData {
  name: string;
  value: number;
}
export interface ManagerReportsAbsenteeRow {
  name: string;
  smartId: string;
  shift: string;
  daysAbsent: number;
  lastPresent: string;
}
export interface ManagerReportsConversionRow {
  month: string;
  newEnq: number;
  converted: number;
  rate: string;
}
export interface ManagerReportsSeatRow {
  shift: string;
  occupancy: string;
  avgDuration: string;
}
export interface ManagerReportsLockerRow {
  type: string;
  occupied: number;
  total: number;
  pct: string;
}
export interface ManagerReportsMaintenanceRow {
  item: string;
  location: string;
  reported: string;
  priority: 'Low' | 'Medium' | 'High';
}
export interface ManagerReportsData {
  kpiCards: ManagerReportsKpiCard[];
  occupancyData: ManagerReportsOccupancyData[];
  growthData: ManagerReportsGrowthData[];
  attendanceData: ManagerReportsAttendanceData[];
  absenteesChartData: ManagerReportsAbsenteeChartData[];
  complaintsData: ManagerReportsComplaintData[];
  absenteeRows: ManagerReportsAbsenteeRow[];
  conversionRows: ManagerReportsConversionRow[];
  seatRows: ManagerReportsSeatRow[];
  lockerRows: ManagerReportsLockerRow[];
  maintenanceRows: ManagerReportsMaintenanceRow[];
}
export interface ManagerReportsFilterBarProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}
export interface ManagerReportsKpiGridProps {
  cards: ManagerReportsKpiCard[];
  isLoading?: boolean;
}
export interface ManagerReportsChartsGridProps {
  data: ManagerReportsData;
}
export interface ManagerReportsTablesGridProps {
  data: ManagerReportsData;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
