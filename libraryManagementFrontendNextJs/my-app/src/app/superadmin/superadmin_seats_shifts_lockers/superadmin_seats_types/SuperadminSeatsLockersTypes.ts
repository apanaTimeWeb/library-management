// RESPONSIBILITY: Renders or handles logic for SuperadminSeatsLockersTypes.ts.


export interface SuperadminSeatsLocker {
  id: string;
  lockerId: string;
  status: SuperadminSeatsLockerStatus;
  assignedTo: string;
  studentId: string;
  assignedSince: string;
}
export type SuperadminSeatsLockerStatus = 'Free' | 'Occupied' | 'Maintenance';

