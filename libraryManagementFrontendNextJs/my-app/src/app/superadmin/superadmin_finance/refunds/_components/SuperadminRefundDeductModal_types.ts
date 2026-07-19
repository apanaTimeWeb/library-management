// RESPONSIBILITY: Renders or handles logic for SuperadminRefundDeductModal_types.ts.
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
export interface RefundDeductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DeductFormData) => void;
  studentName: string;
  isSubmitting: boolean;
}
export const deductSchema = z.object({ deductionAmount: z.number().min(1, 'Amount is required'), deductionReason: z.string().min(1, 'Reason is required') });
export type DeductFormData = z.infer<typeof deductSchema>;

