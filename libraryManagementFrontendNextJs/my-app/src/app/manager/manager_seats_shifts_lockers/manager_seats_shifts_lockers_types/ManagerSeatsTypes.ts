// RESPONSIBILITY: Centralizes types for the manager_seats_shifts_lockers module.

export interface SeatData {
  uuid?: string;
  id: string;
  status: SeatStatus;
  student?: string;
  smartId?: string;
  shift?: string;
  expiry?: string;
}

export interface LockerData {
  uuid?: string;
  id: string;
  lockerNumber?: string;
  isActive?: boolean;
  status: LockerStatus;
}

export interface SeatsState {
  seatsData: SeatData[];
  lockerData: LockerData[];
  allocationsData: Allocation[];
  seatHistoryData: SeatHistoryEntry[];
  status: FetchState;
  error: string | null;
  fetchData: () => Promise<void>;
  fetchLockers: () => Promise<void>;
  fetchAllocationsData: () => Promise<void>;
  fetchSeatHistoryData: () => Promise<void>;
}

export interface Allocation {
  id?: string;
  studentName?: string;
  student?: string;
  seat?: string;
  seatNo?: string;
  shift: string;
  start?: string;
  end?: string;
  customSlots?: string;
  lockerNo?: string;
  validFrom?: string;
  validTill?: string;
  daysLeft?: number;
  status: 'Active' | 'Expiring' | 'Expired' | 'Suspended';
  avatar?: string;
  smartId?: string;
}

export interface ActivityItem {
  id: string;
  date: string;
  student: string;
  locker: string;
  type: 'Assigned' | 'Released' | 'Overdue';
}

export interface Locker {
  id: string;
  number: string;
  zone?: string;
  status: LockerStatus;
  assignedTo?: string;
  validUntil?: string;
  issue?: string;
  studentId?: string;
  assignedSince?: string;
}

export interface SeatHistoryEntry {
  id?: string;
  studentName?: string;
  smartId?: string;
  seatNo?: string;
  student?: string;
  startDate?: string;
  endDate?: string;
  occupiedFrom?: string;
  occupiedTill?: string;
  shift: string;
  status?: 'Completed' | 'Terminated' | 'Transferred';
  duration?: string;
  reason?: string;
}

export interface LogEntry {
  id: string;
  num?: number;
  date: string;
  type?: 'Repair' | 'Cleaning' | 'Replacement';
  notes?: string;
  by?: string;
  remark?: string;
  doneBy?: string;
  statusBefore?: string;
  statusAfter?: string;
  cost?: string;
}


export interface ManagerSeatsSeatMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeat?: SeatData;
}

export interface BookedBlock {
  startH: number;
  endH: number;
  label: string;
}

export interface GapBlock {
  startH: number;
  endH: number;
  seats: number;
  revLoss: number;
}

export interface ShiftData {
  id: string;
  name: string;
  occupied: number;
  capacity: number;
  booked: BookedBlock[];
  gaps: GapBlock[];
}


export interface Student {
  id: string;
  name: string;
  currentShift: string;
  targetShift: string;
  status: 'Pending' | 'Approved' | 'Conflict';
  validTill?: string;
  currentSeat?: string;
  plan?: string;
  smartId?: string;
  dailyRate?: number;
}

export type SeatStatus = 'free' | 'occupied' | 'expiring' | 'maintenance' | 'Working' | 'Maintenance' | 'Broken';
export type LockerStatus = 'Free' | 'Occupied' | 'Maintenance' | 'Available';
export type PayMode = 'Cash' | 'UPI' | 'Card';
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
