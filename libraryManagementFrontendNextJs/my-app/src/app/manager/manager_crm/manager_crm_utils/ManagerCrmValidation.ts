import { z } from 'zod';
import { ManagerCrmFollowUpFormData, ManagerCrmMarkLostFormData } from "./ManagerCrmValidation_types";

export const ManagerCrmFollowUpSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  remark: z.string().min(5, 'Remark must be at least 5 characters').max(500, 'Remark is too long'),
});
export const ManagerCrmMarkLostSchema = z.object({
  reason: z.string().min(1, 'Please select a reason'),
  details: z.string().optional(),
});
