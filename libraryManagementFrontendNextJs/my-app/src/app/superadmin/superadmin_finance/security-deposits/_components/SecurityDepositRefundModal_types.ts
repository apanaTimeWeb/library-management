import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SecurityDepositRefundModalProps {
  target: { id: number; name: string; amount: number } | null;
  onClose: () => void;
  onSubmit: (data: RefundFormData) => void;
  isProcessing: boolean;
}
