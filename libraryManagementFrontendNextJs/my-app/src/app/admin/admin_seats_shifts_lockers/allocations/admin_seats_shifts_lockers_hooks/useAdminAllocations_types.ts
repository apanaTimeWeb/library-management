import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Allocation {
  studentName: string;
  smartId: string;
  seatNo: string;
  shift: string;
  customSlots: string;
  lockerNo: string;
  validFrom: string;
  validTill: string;
  daysLeft: number;
  status: 'Active' | 'Expired' | 'Suspended';
}
