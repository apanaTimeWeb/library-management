import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SecurityDepositDeductModalProps {
  target: { id: number; name: string } | null;
  onClose: () => void;
  onSubmit: (data: DeductFormData) => void;
  isProcessing: boolean;
}
