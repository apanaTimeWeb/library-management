import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatCurrency } from "@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format";
import { SuperadminSearchableDropdown } from "@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown";
export interface RefundProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProcessFormData) => void;
  studentName: string;
  amount: number;
  isSubmitting: boolean;
}
import { z } from 'zod';
export const processSchema = z.object({ paymentMethod: z.enum(['upi', 'bank', 'cash', 'cheque']) });
export type ProcessFormData = z.infer<typeof processSchema>;
