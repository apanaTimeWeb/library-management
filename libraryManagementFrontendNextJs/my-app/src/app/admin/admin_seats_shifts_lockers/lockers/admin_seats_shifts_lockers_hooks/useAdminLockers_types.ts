import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Locker {
  id: string;
  lockerId: string;
  status: LockerStatus;
  assignedTo: string;
  studentId: string;
  assignedSince: string;
}
export type LockerStatus = 'Free' | 'Occupied' | 'Maintenance';
