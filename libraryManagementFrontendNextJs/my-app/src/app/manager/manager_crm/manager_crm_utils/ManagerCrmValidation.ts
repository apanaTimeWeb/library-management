import { z } from 'zod';

export const ManagerCrmFollowUpSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  remark: z.string().min(5, 'Remark must be at least 5 characters').max(500, 'Remark is too long'),
});

export type ManagerCrmFollowUpFormData = z.infer<typeof ManagerCrmFollowUpSchema>;

export const ManagerCrmMarkLostSchema = z.object({
  reason: z.string().min(1, 'Please select a reason'),
  details: z.string().optional(),
});

export type ManagerCrmMarkLostFormData = z.infer<typeof ManagerCrmMarkLostSchema>;
