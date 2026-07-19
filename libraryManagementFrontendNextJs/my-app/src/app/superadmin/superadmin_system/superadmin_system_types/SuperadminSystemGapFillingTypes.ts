// RESPONSIBILITY: Renders or handles logic for SuperadminSystemGapFillingTypes.ts.


export interface SuperadminSystemGapInterval { 
  start: number; 
  end: number; 
}
export interface SuperadminSystemGapDetail extends SuperadminSystemGapInterval { 
  label: string; 
  hours: number; 
}
export interface SuperadminSystemSeatGapRecord {
  seat: string;
  booked: SuperadminSystemGapInterval[];
  gap: SuperadminSystemGapDetail;
}

