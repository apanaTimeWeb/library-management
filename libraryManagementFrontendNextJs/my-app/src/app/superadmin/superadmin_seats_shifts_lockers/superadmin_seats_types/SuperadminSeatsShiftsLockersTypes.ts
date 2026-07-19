// RESPONSIBILITY: Renders or handles logic for SuperadminSeatsShiftsLockersTypes.ts.
import type { ReactNode } from 'react';


export interface SuperadminSeatsStudent {
  id: string;
  name: string;
  smartId: string;
  currentShift: string;
  currentSeat: string;
  validTill: string;
  plan: string;
  dailyRate: number;
}
export interface SuperadminSeatsShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  occupancy: number;
  capacity: number;
  active: boolean;
}
export interface SuperadminSeatsBookedBlock {
  startH: number;
  endH: number;
  label: string;
}
export interface SuperadminSeatsGapBlock {
  startH: number;
  endH: number;
  seats: number;
  revLoss: number;
}
export interface SuperadminSeatsShiftGapData {
  id: string;
  name: string;
  occupied: number;
  capacity: number;
  booked: SuperadminSeatsBookedBlock[];
  gaps: SuperadminSeatsGapBlock[];
}
export interface SuperadminSeatsSeatData {
  uuid?: string;
  id: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  student?: string;
  smartId?: string;
  shift?: string;
  expiry?: string;
}
export interface SuperadminSeatsSeat {
  id: string;
  seatNo: string;
  branch: string;
  status: SuperadminSeatsSeatStatus;
  assignedTo: string;
  lastMaintenance: string;
}
export interface SuperadminSeatsLogEntry {
  id: string;
  num: number;
  date: string;
  remark: string;
  doneBy: string;
  statusBefore: SuperadminSeatsSeatStatus;
  statusAfter: SuperadminSeatsSeatStatus;
  cost: string;
}
export interface SuperadminSeatsHistoryEntry {
  seatNo: string;
  studentName: string;
  smartId: string;
  shift: string;
  occupiedFrom: string;
  occupiedTill: string;
  duration: string;
  reason: 'Admission' | 'Shift Change' | 'Seat Change';
}
export interface SuperadminSeatsLockerData {
  uuid: string;
  id: string;
  status: 'free' | 'occupied' | 'maintenance';
}
export interface SuperadminSeatsActivityItem {
  icon: ReactNode;
  text: string;
  sub: string;
  id: string;
}
export type SuperadminSeatsSeatStatus = 'Working' | 'Maintenance' | 'Broken';

