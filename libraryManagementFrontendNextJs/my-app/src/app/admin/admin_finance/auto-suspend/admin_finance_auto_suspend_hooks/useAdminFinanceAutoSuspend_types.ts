import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type Config = { 
  daysBeforeSuspend: number; 
  currentlySuspended: number; 
  autoRestoredThisMonth: number; 
  manualRestores: number 
};
export type SuspendedStudent = { 
  id: number; 
  studentId: number; 
  studentName: string; 
  smartId: string; 
  seat: string; 
  shift: string; 
  daysOverdue: number; 
  suspendedSince: string 
};
