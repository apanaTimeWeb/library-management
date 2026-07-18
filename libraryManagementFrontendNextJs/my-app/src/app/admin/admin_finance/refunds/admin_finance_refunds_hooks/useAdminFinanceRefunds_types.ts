import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type RefundStatus = 'pending' | 'approved' | 'rejected' | 'processed';
export type Refund = {
  id: number;
  studentName: string;
  smartId: string;
  exitDate?: string;
  depositHeld: number;
  deductionAmount: number;
  netRefund: number;
  status: RefundStatus;
  requestedDate: string;
  processedDate?: string;
  paymentMethod?: string;
  rejectionReason?: string;
};
