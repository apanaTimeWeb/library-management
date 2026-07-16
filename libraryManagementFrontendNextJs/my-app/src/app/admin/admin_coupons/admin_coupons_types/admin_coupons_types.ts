// RESPONSIBILITY: Type definitions and Zod form schemas for admin_coupons (`Rule 7`, `Rule 16`, `Rule 27`, `Rule 44`).
// DATA FLOW: Types imported by Store, Hooks, Dialog, and Client Component.

import { z } from 'zod';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export type CouponStatus = 'Active' | 'Expired' | 'Exhausted';
export type CouponDiscountType = 'Flat' | 'Percent';

export interface CouponRecord {
  id: string;
  code: string;
  discount: number;
  type: CouponDiscountType;
  usedCount: number;
  maxUses: number;
  expiry: string;
  status: CouponStatus;
}

export const adminCouponFormSchema = z.object({
  code: z.string()
    .min(3, 'Code must be at least 3 characters')
    .max(25, 'Code cannot exceed 25 characters')
    .regex(/^[A-Z0-9_-]+$/, 'Code can only contain uppercase letters, numbers, hyphens, and underscores'),
  discount: z.number({ required_error: 'Discount is required', invalid_type_error: 'Must be a valid number' })
    .positive('Discount must be greater than 0'),
  type: z.enum(['Flat', 'Percent']),
  maxUses: z.number({ required_error: 'Max uses is required', invalid_type_error: 'Must be a valid number' })
    .int('Max uses must be a whole number')
    .positive('Max uses must be at least 1'),
  expiry: z.string().min(1, 'Expiry date is required'),
});

export type AdminCouponFormData = z.infer<typeof adminCouponFormSchema>;

export interface AdminCouponsStoreState {
  coupons: CouponRecord[];
  fetchState: FetchState;
  errorMessage: string | null;
  fetchCoupons: () => Promise<void>;
  createCoupon: (data: AdminCouponFormData) => Promise<{ success: boolean; message: string }>;
  deleteCoupon: (id: string) => Promise<{ success: boolean; message: string }>;
  setCoupons: (coupons: CouponRecord[]) => void;
  setFetchState: (state: FetchState) => void;
}
