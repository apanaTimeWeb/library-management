export type SuperadminSeatsLockerStatus = 'Free' | 'Occupied' | 'Maintenance';

export interface SuperadminSeatsLocker {
  id: string;
  lockerId: string;
  status: SuperadminSeatsLockerStatus;
  assignedTo: string;
  studentId: string;
  assignedSince: string;
}
