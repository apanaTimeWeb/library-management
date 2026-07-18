// RESPONSIBILITY: Renders the AdminCrmschema.ts component/hook.
import { z } from 'zod';

// ─── Add Enquiry ──────────────────────────────────────────────────────────────
export const addEnquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Full name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits'),
});
export type AddEnquiryFormData = z.infer<typeof addEnquirySchema>;

// ─── Follow-Up ────────────────────────────────────────────────────────────────
export const followUpSchema = z.object({
  date: z
    .string()
    .min(1, 'Follow-up date is required'),
  remark: z
    .string()
    .min(3, 'Remark must be at least 3 characters'),
});
export type FollowUpFormData = z.infer<typeof followUpSchema>;

// ─── Update Status ────────────────────────────────────────────────────────────
export const updateStatusSchema = z.object({
  status: z.enum(['new', 'visited', 'interested', 'converted', 'lost'], {
    error: 'Please select a valid status',
  }),
});
export type UpdateStatusFormData = z.infer<typeof updateStatusSchema>;

// ─── Mark as Lost ─────────────────────────────────────────────────────────────
export const markLostSchema = z.object({
  reason: z.string().optional(),
});
export type MarkLostFormData = z.infer<typeof markLostSchema>;

