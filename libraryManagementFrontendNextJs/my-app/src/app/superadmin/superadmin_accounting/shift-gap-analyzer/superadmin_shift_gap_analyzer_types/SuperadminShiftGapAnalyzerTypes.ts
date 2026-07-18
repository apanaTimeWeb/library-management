

export interface SuperadminShiftGap {
  shift: string;
  totalSeats: number;
  occupied: number;
  vacant: number;
  occupancyPct: number;
  avgGapDays: number;
  revenueLoss: number;
}
export interface SuperadminDayGap {
  date: string;
  shift: string;
  seatNo: string;
  gapDays: number;
  loss: number;
}
