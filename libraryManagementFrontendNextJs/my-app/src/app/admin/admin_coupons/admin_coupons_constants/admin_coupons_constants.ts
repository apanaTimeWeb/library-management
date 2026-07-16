// RESPONSIBILITY: Centralized constants and initial mock data for admin_coupons (`Rule 3`, `Rule 35`).
// DATA FLOW: Constants -> Store, Hooks, and Components.

import { CouponRecord } from '@/app/admin/admin_coupons/admin_coupons_types/admin_coupons_types';

export const COUPON_STATUS_BADGES: Record<string, string> = {
  Active:    'admin-badge admin-badge-success',
  Expired:   'admin-badge admin-badge-danger',
  Exhausted: 'admin-badge admin-badge-warning',
};

export const MOCK_COUPONS: CouponRecord[] = [
  { id: 'C1', code: 'NEWYEAR50',  discount: 50,  type: 'Flat',    usedCount: 12, maxUses: 50,  expiry: '31/12/25', status: 'Active'    },
  { id: 'C2', code: 'FRIEND200',  discount: 200, type: 'Flat',    usedCount: 8,  maxUses: 100, expiry: '31/03/26', status: 'Active'    },
  { id: 'C3', code: 'SUMMER10',   discount: 10,  type: 'Percent', usedCount: 30, maxUses: 30,  expiry: '30/06/25', status: 'Exhausted' },
  { id: 'C4', code: 'WELCOME100', discount: 100, type: 'Flat',    usedCount: 5,  maxUses: 200, expiry: '31/12/25', status: 'Active'    },
  { id: 'C5', code: 'HOLI25',     discount: 25,  type: 'Percent', usedCount: 18, maxUses: 50,  expiry: '15/03/25', status: 'Expired'   },
];
