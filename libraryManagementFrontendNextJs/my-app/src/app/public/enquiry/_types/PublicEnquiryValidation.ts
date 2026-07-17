import { z } from 'zod';

export const publicEnquirySchema = z.object({
  name:    z.string().min(2, 'Full name is required (min 2 characters)'),
});
export type PublicEnquiryFormData = z.infer<typeof publicEnquirySchema>;
