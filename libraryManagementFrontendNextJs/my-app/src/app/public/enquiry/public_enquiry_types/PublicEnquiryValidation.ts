import { z } from 'zod';

export const publicEnquirySchema = z.object({
  name:    z.string().min(2, 'Full name is required (min 2 characters)'),
  phone:   z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+91\s?\d{10}$/, 'Enter a valid +91 number (e.g. +91 9800000000)'),
  shift:   z.string().min(1, 'Please select a preferred shift'),
  message: z.string().optional(),
});
export type PublicEnquiryFormData = z.infer<typeof publicEnquirySchema>;
