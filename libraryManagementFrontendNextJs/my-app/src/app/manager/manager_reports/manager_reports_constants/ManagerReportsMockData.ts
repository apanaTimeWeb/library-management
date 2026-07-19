// RESPONSIBILITY: Renders or handles logic for ManagerReportsMockData.ts.
import { ManagerReportsData } from '@/app/manager/manager_reports/manager_reports_types/ManagerReportsTypes';

export const MOCK_MANAGER_REPORTS_DATA: ManagerReportsData = {
  kpiCards: [
    { title: 'Total Students', value: '1,245', icon: 'Users', iconClass: 'text-primary bg-primary-subtle', trend: 'â†‘ 12% vs last month' },
    { title: 'Today\'s Attendance', value: '89%', icon: 'CalendarCheck', iconClass: 'text-success bg-success-bg', trend: 'â†‘ 2% vs yesterday' },
    { title: 'New Admissions', value: '42', icon: 'UserPlus', iconClass: 'text-info bg-info-subtle' },
    { title: 'Active Complaints', value: '8', icon: 'Phone', iconClass: 'text-danger bg-danger-subtle' },
  ],
  occupancyData: [
    { name: 'Morning', value: 45 },
    { name: 'Afternoon', value: 30 },
    { name: 'Evening', value: 20 },
    { name: 'Night', value: 5 },
  ],
  growthData: [
    { date: 'Mon', joined: 5, exited: 1 },
    { date: 'Tue', joined: 8, exited: 0 },
    { date: 'Wed', joined: 12, exited: 2 },
    { date: 'Thu', joined: 6, exited: 1 },
    { date: 'Fri', joined: 15, exited: 3 },
    { date: 'Sat', joined: 20, exited: 0 },
    { date: 'Sun', joined: 10, exited: 1 },
  ],
  attendanceData: [
    { day: 'Mon', avg: 92 },
    { day: 'Tue', avg: 88 },
    { day: 'Wed', avg: 95 },
    { day: 'Thu', avg: 90 },
    { day: 'Fri', avg: 85 },
    { day: 'Sat', avg: 70 },
    { day: 'Sun', avg: 60 },
  ],
  absenteesChartData: [
    { name: 'Rahul S.', absences: 5 },
    { name: 'Priya K.', absences: 4 },
    { name: 'Amit J.', absences: 4 },
    { name: 'Neha R.', absences: 3 },
    { name: 'Vikas T.', absences: 3 },
  ],
  complaintsData: [
    { name: 'Unresolved', value: 30 },
    { name: 'Resolved', value: 70 },
  ],
  absenteeRows: [
    { name: 'Rahul Sharma', smartId: 'ST-0123', shift: 'Morning', daysAbsent: 5, lastPresent: '10 Oct' },
    { name: 'Priya Kumar', smartId: 'ST-0124', shift: 'Evening', daysAbsent: 4, lastPresent: '11 Oct' },
    { name: 'Amit Jain', smartId: 'ST-0125', shift: 'Night', daysAbsent: 4, lastPresent: '11 Oct' },
    { name: 'Neha Reddy', smartId: 'ST-0126', shift: 'Morning', daysAbsent: 3, lastPresent: '12 Oct' },
    { name: 'Vikas Tiwari', smartId: 'ST-0127', shift: 'Afternoon', daysAbsent: 3, lastPresent: '12 Oct' },
  ],
  conversionRows: [
    { month: 'Oct', newEnq: 120, converted: 40, rate: '33.3%' },
    { month: 'Sep', newEnq: 150, converted: 45, rate: '30.0%' },
    { month: 'Aug', newEnq: 110, converted: 38, rate: '34.5%' },
    { month: 'Jul', newEnq: 130, converted: 42, rate: '32.3%' },
  ],
  seatRows: [
    { shift: 'Morning', occupancy: '145 / 150', avgDuration: '4.5 hrs' },
    { shift: 'Afternoon', occupancy: '90 / 150', avgDuration: '3.2 hrs' },
    { shift: 'Evening', occupancy: '130 / 150', avgDuration: '4.0 hrs' },
    { shift: 'Night', occupancy: '40 / 150', avgDuration: '6.5 hrs' },
  ],
  lockerRows: [
    { type: 'Small', occupied: 80, total: 100, pct: '80%' },
    { type: 'Medium', occupied: 45, total: 50, pct: '90%' },
    { type: 'Large', occupied: 20, total: 20, pct: '100%' },
  ],
  maintenanceRows: [
    { item: 'AC Unit 3', location: 'Reading Hall A', reported: '14 Oct', priority: 'High' },
    { item: 'Broken Chair', location: 'Cubicle 12', reported: '15 Oct', priority: 'Low' },
    { item: 'Flickering Light', location: 'Hallway', reported: '15 Oct', priority: 'Medium' },
    { item: 'Water Dispenser', location: 'Cafeteria', reported: '16 Oct', priority: 'High' },
  ],
};

