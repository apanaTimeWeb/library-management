import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminSeatsLocker {
  id: string;
  lockerId: string;
  status: SuperadminSeatsLockerStatus;
  assignedTo: string;
  studentId: string;
  assignedSince: string;
}
export type SuperadminSeatsLockerStatus = 'Free' | 'Occupied' | 'Maintenance';
