// RESPONSIBILITY: Type definitions and Zod form schemas for admin_coupons (`Rule 7`, `Rule 16`, `Rule 27`, `Rule 44`).
// DATA FLOW: Types imported by Store, Hooks, Dialog, and Client Component.

import { z } from 'zod';
import { CouponRecord, AdminCouponsStoreState, FetchState, CouponStatus, CouponDiscountType, AdminCouponFormData } from "./admin_coupons_types_types";

export const adminCouponFormSchema = z.object({
  code: z.string()
    .min(3, 'Code must be at least 3 characters')
    .max(25, 'Code cannot exceed 25 characters')
    .regex(/^[A-Z0-9_-]+$/, 'Code can only contain uppercase letters, numbers, hyphens, and underscores'),
  discount: z.number({ message: 'Must be a valid number' })
    .positive('Discount must be greater than 0'),
  type: z.enum(['Flat', 'Percent']),
  maxUses: z.number({ message: 'Must be a valid number' })
    .int('Max uses must be a whole number')
    .positive('Max uses must be at least 1'),
  expiry: z.string().min(1, 'Expiry date is required'),
});
