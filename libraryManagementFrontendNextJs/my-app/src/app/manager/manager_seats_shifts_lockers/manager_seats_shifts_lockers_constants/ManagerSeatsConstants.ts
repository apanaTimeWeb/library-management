// RESPONSIBILITY: Centralizes constants for the manager_seats_shifts_lockers module.

import { ActivityItem, Locker, Seat, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';

export const SHIFT_TABS = ['All', 'Morning', 'Evening', 'Full Day'];

export const LEGEND_ITEMS = [
  { cls: 'w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(var(--success),0.5)]',     label: 'Free' },
  { cls: 'w-2.5 h-2.5 rounded-full bg-danger shadow-[0_0_8px_rgba(var(--danger),0.5)]',      label: 'Occupied' },
  { cls: 'w-2.5 h-2.5 rounded-full bg-warning shadow-[0_0_8px_rgba(var(--warning),0.5)]',     label: 'Expiring ≤7 days' },
  { cls: 'w-2.5 h-2.5 rounded-full bg-border shadow-inner', label: 'Maintenance' },
];

export const SHIFT_BADGE: Record<string, string> = {
  Morning:  'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-primary/15 text-primary border border-primary/20',
  Evening:  'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-success/15 text-success border border-success/20',
  Night: 'bg-black/50 text-white border border-white/20',
  'Full Day':'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-info/15 text-info border border-info/20',
};

export const SEAT_MATRIX_STATUS_STYLES: Record<string, string> = {
  free: 'bg-bg-elevated border border-success text-success hover:bg-success hover:text-white',
  occupied: 'bg-danger text-white border-transparent opacity-90',
  expiring: 'bg-warning text-white border-transparent',
  maintenance: 'bg-bg-elevated text-text-secondary border-transparent opacity-50 cursor-not-allowed shadow-none'
};

export const ACTIVITY_DATA: ActivityItem[] = [
  { id: '1', date: 'Today, 10:30 AM', student: 'Rahul Sharma', locker: 'L-12', type: 'Assigned' },
  { id: '2', date: 'Today, 09:15 AM', student: 'Priya Verma',  locker: 'L-05', type: 'Released' },
  { id: '3', date: 'Yesterday',       student: 'Amit Kumar',   locker: 'L-22', type: 'Overdue' },
];

export const INITIAL_LOCKERS: Locker[] = [
  { id: '1', number: 'L-01', zone: 'Zone A', status: 'Occupied', assignedTo: 'Rahul Sharma', validUntil: '2026-05-15' },
  { id: '2', number: 'L-02', zone: 'Zone A', status: 'Available' },
  { id: '3', number: 'L-03', zone: 'Zone B', status: 'Maintenance', issue: 'Broken Lock' },
  { id: '4', number: 'L-04', zone: 'Zone B', status: 'Available' },
];

export const INITIAL_SEATS: Seat[] = [
  { id: '1', number: 'A-01', zone: 'Quiet',    type: 'Premium',  condition: 'Excellent',    hasPower: true, status: 'free' },
  { id: '2', number: 'A-02', zone: 'Quiet',    type: 'Standard', condition: 'Good',         hasPower: false, status: 'free' },
  { id: '3', number: 'B-01', zone: 'Standard', type: 'Standard', condition: 'Needs Repair', hasPower: true, status: 'maintenance' },
];

export const SHIFTS_DATA: ShiftData[] = [
  { id: '1', name: 'Morning', occupied: 45, capacity: 50, booked: [{startH: 6, endH: 14, label: 'Morning Slot'}], gaps: [] },
  { id: '2', name: 'Evening', occupied: 30, capacity: 50, booked: [{startH: 14, endH: 22, label: 'Evening Slot'}], gaps: [{startH: 14, endH: 22, seats: 20, revLoss: 16000}] },
];

export const INITIAL_SHIFTS: Shift[] = [
  { id: '1', name: 'Morning Shift', startH: 6,  endH: 14, price: 800, type: 'Morning' },
  { id: '2', name: 'Evening Shift', startH: 14, endH: 22, price: 800, type: 'Evening' },
  { id: '3', name: 'Night Shift',   startH: 22, endH: 6,  price: 600, type: 'Night' },
];

export const STUDENTS_DATA: Student[] = [
  { id: '1', name: 'Rahul Sharma', currentShift: 'Morning Shift', targetShift: 'Evening Shift', status: 'Pending' },
  { id: '2', name: 'Priya Verma',  currentShift: 'Evening Shift', targetShift: 'Morning Shift', status: 'Approved' },
  { id: '3', name: 'Amit Kumar',   currentShift: 'Night Shift',   targetShift: 'Morning Shift', status: 'Conflict' },
];
