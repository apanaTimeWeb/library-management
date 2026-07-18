import { z } from 'zod';
import { PublicEnquiryFormData } from "./PublicEnquiryValidation_types";

export const publicEnquirySchema = z.object({
  name:    z.string().min(2, 'Full name is required (min 2 characters)'),
});
