// RESPONSIBILITY: Renders the admin_coupons_constants.ts component/hook.
import { CouponRecord } from '@/app/admin/admin_coupons/admin_coupons_types/admin_coupons_types';

export const MOCK_COUPONS: CouponRecord[] = [
  { id: 'CPN-1', code: 'SUMMER25', discount: 25, type: 'Percent', status: 'Active', usedCount: 45, maxUses: 100, expiry: '2026-08-31' },
  { id: 'CPN-2', code: 'FLAT500', discount: 500, type: 'Flat', status: 'Active', usedCount: 12, maxUses: 50, expiry: '2026-07-30' },
  { id: 'CPN-3', code: 'EARLYBIRD', discount: 10, type: 'Percent', status: 'Expired', usedCount: 100, maxUses: 100, expiry: '2026-05-31' },
];
