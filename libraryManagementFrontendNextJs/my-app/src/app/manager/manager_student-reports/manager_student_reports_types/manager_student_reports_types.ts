export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export interface ReportsData {
  kpiCards?: { icon: string; color: string; title: string; value: string; trend?: string }[];
  shiftOccupancyData?: { name: string; occupancy: number }[];
  studentGrowthData?: { date: string; joined: number; exited: number }[];
  attendanceTrendData?: { date: string; attendance: number }[];
  topAbsenteesData?: { name: string; absent: number }[];
  complaintStatusData?: { name: string; value: number }[];
  absenteeReportData?: { id: string; name: string; absentDays: number; lastPresent: string }[];
  enquiryConversionData?: { id: string; month: string; new: number; converted: number }[];
  seatUtilizationData?: { id: string; shift: string; utilization: number; occupancy: number; total: number }[];
  lockerUtilizationData?: { id: string; type: string; utilization: number; available: number }[];
  maintenanceData?: { id: string; item: string; issue: string; reported: string; status: string }[];
}
