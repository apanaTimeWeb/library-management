// RESPONSIBILITY: Type definitions and Zod form validation schema for admin_plans (`Rule 7`, `Rule 16`, `Rule 27`, `Rule 44`).
// DATA FLOW: Types imported by Store, Hooks, Dialog, and Client Component.

import { z } from 'zod';
import { PlanRecord, AdminPlansStoreState, FetchState, PlanStatus, AdminPlanFormData } from "./admin_plans_types_types";

export const adminPlanFormSchema = z.object({
  name: z.string().min(2, 'Plan name must be at least 2 characters').max(60, 'Plan name too long'),
  price: z.number()
    .positive('Price must be greater than 0'),
  duration: z.string().min(2, 'Duration label required (e.g. 1 Month)'),
  durationDays: z.number()
    .int('Must be a whole number of days')
    .positive('Must be at least 1 day'),
  featuresText: z.string().min(3, 'At least one feature required (one per line)'),
});
