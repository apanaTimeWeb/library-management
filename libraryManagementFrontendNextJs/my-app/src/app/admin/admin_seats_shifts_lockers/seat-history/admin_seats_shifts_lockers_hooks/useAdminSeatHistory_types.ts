import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SeatHistoryEntry {
  seatNo: string;
  studentName: string;
  smartId: string;
  shift: string;
  occupiedFrom: string;
  occupiedTill: string;
  duration: string;
  reason: 'Admission' | 'Shift Change' | 'Seat Change';
}
