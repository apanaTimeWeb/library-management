import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type ShiftGap = {
  shift: string;
  totalSeats: number;
  occupied: number;
  vacant: number;
  occupancyPct: number;
  avgGapDays: number;
  revenueLoss: number;
};
export type DayGap = { date: string; shift: string; seatNo: string; gapDays: number; loss: number };
