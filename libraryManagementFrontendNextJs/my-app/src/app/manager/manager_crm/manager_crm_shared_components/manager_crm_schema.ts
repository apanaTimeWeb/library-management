import { z } from 'zod';
import { AddEnquiryFormData, FollowUpFormData, UpdateStatusFormData, MarkLostFormData } from "./manager_crm_schema_types";

// ─── Add Enquiry ──────────────────────────────────────────────────────────────
export const addEnquirySchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
});
// ─── Follow-Up ────────────────────────────────────────────────────────────────
export const followUpSchema = z.object({
  date: z
    .string()
    .min(1, 'Follow-up date is required'),
  remark: z
    .string()
    .min(3, 'Remark must be at least 3 characters'),
});
// ─── Update Status ────────────────────────────────────────────────────────────
export const updateStatusSchema = z.object({
  status: z.enum(['new', 'visited', 'interested', 'converted', 'lost'], {
    error: 'Please select a valid status',
  }),
});
// ─── Mark as Lost ─────────────────────────────────────────────────────────────
export const markLostSchema = z.object({
  reason: z.string().optional(),
});
