import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Seat {
  id: string;
  seatNo: string;
  branch: string;
  status: SeatStatus;
  assignedTo: string;
  lastMaintenance: string;
}
export type SeatStatus = 'Working' | 'Maintenance' | 'Broken';
