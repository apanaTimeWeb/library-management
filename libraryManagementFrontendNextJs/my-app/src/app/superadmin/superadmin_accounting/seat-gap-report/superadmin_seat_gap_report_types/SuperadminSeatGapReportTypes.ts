// RESPONSIBILITY: Renders or handles logic for SuperadminSeatGapReportTypes.ts.


export interface SuperadminGapRow {
  seatNo: string;
  shift: string;
  floor: string;
  lastOccupied: string;
  gapDays: number;
  revenueLoss: number;
  status: 'vacant' | 'maintenance';
}

