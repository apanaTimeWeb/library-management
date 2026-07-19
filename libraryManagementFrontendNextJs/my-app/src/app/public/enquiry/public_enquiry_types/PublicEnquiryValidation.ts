// RESPONSIBILITY: Renders or handles logic for PublicEnquiryValidation.ts.
import { z } from 'zod';


export type PublicEnquiryFormData = z.infer<typeof publicEnquirySchema>;

export const publicEnquirySchema = z.object({
  name:    z.string().min(2, 'Full name is required (min 2 characters)'),
});

