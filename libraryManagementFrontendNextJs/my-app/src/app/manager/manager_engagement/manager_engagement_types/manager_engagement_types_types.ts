import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface StudentAttendance {
  id: string;
  smartId: string;
  name: string;
  initials: string;
  shift: string;
  consecutiveAbsent: number;
  status: AttStatus;
  inTime: string;
  outTime: string;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type AttStatus = 'present' | 'absent' | 'late' | null;
