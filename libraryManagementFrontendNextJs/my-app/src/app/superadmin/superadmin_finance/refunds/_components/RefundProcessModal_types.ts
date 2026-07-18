import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface RefundProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProcessFormData) => void;
  studentName: string;
  amount: number;
  isSubmitting: boolean;
}
export type ProcessFormData = z.infer<typeof processSchema>;
