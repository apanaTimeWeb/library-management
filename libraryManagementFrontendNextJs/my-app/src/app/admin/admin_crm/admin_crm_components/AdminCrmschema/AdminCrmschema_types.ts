import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type AddEnquiryFormData = z.infer<typeof addEnquirySchema>;
export type FollowUpFormData = z.infer<typeof followUpSchema>;
export type UpdateStatusFormData = z.infer<typeof updateStatusSchema>;
export type MarkLostFormData = z.infer<typeof markLostSchema>;
