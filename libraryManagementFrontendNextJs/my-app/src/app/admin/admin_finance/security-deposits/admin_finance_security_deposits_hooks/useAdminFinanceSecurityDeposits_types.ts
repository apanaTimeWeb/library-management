import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type Deposit = {
  id: number;
  studentName: string;
  smartId: string;
  depositAmount: number;
  collectedBy: string;
  collectedDate: string;
  deductionAmount: number;
  deductionReason?: string;
  status: 'held' | 'refunded' | 'forfeited';
  refundedDate?: string;
};
