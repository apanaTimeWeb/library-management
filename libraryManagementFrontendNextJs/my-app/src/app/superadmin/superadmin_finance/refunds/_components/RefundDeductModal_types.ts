import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface RefundDeductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DeductFormData) => void;
  studentName: string;
  isSubmitting: boolean;
}
export type DeductFormData = z.infer<typeof deductSchema>;
