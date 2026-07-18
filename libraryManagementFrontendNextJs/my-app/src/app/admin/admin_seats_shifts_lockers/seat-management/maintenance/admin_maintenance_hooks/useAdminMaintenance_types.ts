import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface LogEntry {
  id: string;
  num: number;
  date: string;
  remark: string;
  doneBy: string;
  statusBefore: SeatStatus;
  statusAfter: SeatStatus;
  cost: string;
}
export type SeatStatus = 'Working' | 'Maintenance' | 'Broken';
