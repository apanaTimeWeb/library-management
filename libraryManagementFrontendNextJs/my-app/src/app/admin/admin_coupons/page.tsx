// RESPONSIBILITY: Server Component entry page for the admin_coupons module (`Rule 8`, `Rule 38`).
// DATA FLOW: Next.js App Router -> Server Page -> AdminCouponsClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminCouponsClient } from '@/app/admin/admin_coupons/admin_coupons_components/AdminCouponsClient';
import { AdminCouponsSkeleton } from '@/app/admin/admin_coupons/admin_coupons_components/AdminCouponsSkeleton';

export default function AdminCouponsPage() {
  return (
    <Suspense fallback={<AdminCouponsSkeleton />}>
      <AdminCouponsClient />
    </Suspense>
  );
}
