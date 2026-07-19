// RESPONSIBILITY: Renders or handles logic for SuperadminSchema.ts.
import { z } from 'zod';


export type AddEnquiryFormData = z.infer<typeof addEnquirySchema>;
export type FollowUpFormData = z.infer<typeof followUpSchema>;
export type UpdateStatusFormData = z.infer<typeof updateStatusSchema>;
export type MarkLostFormData = z.infer<typeof markLostSchema>;

// â”€â”€â”€ Add Enquiry â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const addEnquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Full name must be at least 2 characters'),
});
// â”€â”€â”€ Follow-Up â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const followUpSchema = z.object({
  date: z
    .string()
    .min(1, 'Follow-up date is required'),
  remark: z
    .string()
    .min(3, 'Remark must be at least 3 characters'),
});
// â”€â”€â”€ Update Status â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const updateStatusSchema = z.object({
  status: z.enum(['new', 'visited', 'interested', 'converted', 'lost'], {
    error: 'Please select a valid status',
  }),
});
// â”€â”€â”€ Mark as Lost â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const markLostSchema = z.object({
  reason: z.string().optional(),
});

