import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type PromiseItem = {
  id: number;
  studentName: string;
  smartId: string;
  promisedAmount: number;
  expectedDate: string;
  daysUntilDue: number;
  timesChanged: number;
  status: 'pending' | 'fulfilled' | 'overdue';
  fulfilledDate?: string;
};
