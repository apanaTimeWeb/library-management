import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type Config = { gracePeriodDays: number; penaltyPerDay: number };
export type OverdueStudent = {
  studentId: string;
  studentName: string;
  smartId: string;
  phone: string;
  dueDate: string;
  daysOverdue: number;
  accruedFee: number;
  totalDue: number;
};
