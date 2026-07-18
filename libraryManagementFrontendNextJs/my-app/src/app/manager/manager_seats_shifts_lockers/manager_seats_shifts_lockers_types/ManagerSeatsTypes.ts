

export interface Allocation {
  id: string; student: string; seat: string; shift: string; start: string; end: string; status: 'Active' | 'Expiring' | 'Expired'; avatar?: string;
}
export interface ActivityItem {
  id: string; date: string; student: string; locker: string; type: 'Assigned' | 'Released' | 'Overdue';
}
export interface Locker {
  id: string; number: string; zone: string; status: 'Available' | 'Occupied' | 'Maintenance';
  assignedTo?: string; validUntil?: string; issue?: string;
}
export interface SeatHistoryEntry {
  id: string; student: string; startDate: string; endDate: string; shift: string; status: 'Completed' | 'Terminated' | 'Transferred';
}
export interface LogEntry {
  id: string; date: string; type: 'Repair' | 'Cleaning' | 'Replacement'; notes: string; by: string;
}
export interface Seat {
  id: string; number: string; zone: 'Quiet' | 'Discussion' | 'Standard'; type: 'Premium' | 'Standard';
  condition: 'Excellent' | 'Good' | 'Needs Repair'; hasPower: boolean;
}
export interface ManagerSeatsSeatMatrixModalProps {
  isOpen: boolean; onClose: () => void; selectedSeat?: any;
}
export interface BookedBlock { startH: number; endH: number; label: string; }
export interface GapBlock    { startH: number; endH: number; seats: number; revLoss: number; }
export interface ShiftData   { id: string; name: string; occupied: number; capacity: number; booked: BookedBlock[]; gaps: GapBlock[]; }
export interface Shift {
  id: string; name: string; startH: number; endH: number; price: number; type: 'Morning' | 'Evening' | 'Night' | 'Full Day';
}
export interface Student {
  id: string; name: string; currentShift: string; targetShift: string; status: 'Pending' | 'Approved' | 'Conflict';
  validTill?: string;
  currentSeat?: string;
  plan?: string;
  smartId?: string;
  dailyRate?: number;
}
