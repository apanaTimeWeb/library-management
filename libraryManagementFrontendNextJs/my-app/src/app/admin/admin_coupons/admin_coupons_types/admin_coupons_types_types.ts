import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
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
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type CouponStatus = 'Active' | 'Expired' | 'Exhausted';
export type CouponDiscountType = 'Flat' | 'Percent';
export type AdminCouponFormData = z.infer<typeof adminCouponFormSchema>;
