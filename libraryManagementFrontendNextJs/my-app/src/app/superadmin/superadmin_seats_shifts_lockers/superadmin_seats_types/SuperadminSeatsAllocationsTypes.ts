

export interface SuperadminSeatsAllocation {
  studentName: string;
  smartId: string;
  seatNo: string;
  shift: string;
  customSlots: string;
  lockerNo: string;
  validFrom: string;
  validTill: string;
  daysLeft: number;
  status: SuperadminSeatsAllocationStatus;
}
export type SuperadminSeatsAllocationStatus = 'Active' | 'Expired' | 'Suspended';
