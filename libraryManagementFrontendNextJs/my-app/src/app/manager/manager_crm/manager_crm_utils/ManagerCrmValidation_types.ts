import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type ManagerCrmFollowUpFormData = z.infer<typeof ManagerCrmFollowUpSchema>;
export type ManagerCrmMarkLostFormData = z.infer<typeof ManagerCrmMarkLostSchema>;
