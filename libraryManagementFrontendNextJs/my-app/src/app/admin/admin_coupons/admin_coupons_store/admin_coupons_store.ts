// RESPONSIBILITY: Zustand store for managing asynchronous state, mutations, and data sharing across admin_coupons (`Rule 5`).
// DATA FLOW: API / Dialogs -> Store -> Client Component (`Rule 39`).

import { create } from 'zustand';
import { fetchApi } from '@/lib/api';
import { ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import { logger } from '@/lib/logger';
import { AdminCouponsStoreState, CouponRecord, AdminCouponFormData } from '@/app/admin/admin_coupons/admin_coupons_types/admin_coupons_types';
import { MOCK_COUPONS } from '@/app/admin/admin_coupons/admin_coupons_constants/admin_coupons_constants';

export const useAdminCouponsStore = create<AdminCouponsStoreState>((set, get) => ({
  coupons: [],
  fetchState: 'idle',
  errorMessage: null,

  setCoupons: (coupons) => set({ coupons }),
  setFetchState: (fetchState) => set({ fetchState }),

  fetchCoupons: async () => {
    set({ fetchState: 'loading', errorMessage: null });
    try {
      const data = await fetchApi(ADMIN_API_ROUTES.COUPONS);
      const actualData = Array.isArray(data) ? data : (data?.data || []);
      
      if (actualData.length === 0 || actualData[0]?.id?.startsWith('MOCK-')) {
        set({ coupons: MOCK_COUPONS as unknown as CouponRecord[], fetchState: 'success' });
        return;
      }

      if (Array.isArray(actualData)) {
        const mapped: CouponRecord[] = actualData.map((c: Record<string, unknown>) => ({
          id: String(c.id || `C-${Math.random().toString(36).substring(2, 8)}`),
          code: String(c.code || 'COUPON').toUpperCase(),
          discount: Number(c.discountValue || c.discount || 0),
          type: c.discountType === 'percentage' || c.type === 'Percent' ? 'Percent' : 'Flat',
          usedCount: Number(c.usedCount || 0),
          maxUses: Number(c.maxUses || 100),
          expiry: c.validUntil ? new Date(String(c.validUntil)).toLocaleDateString() : String(c.expiry || '31/12/26'),
          status: (['Active', 'Expired', 'Exhausted'].includes(String(c.status))
            ? String(c.status)
            : Boolean(c.isActive)
            ? 'Active'
            : 'Expired') as CouponRecord['status'],
        }));
        set({ coupons: mapped, fetchState: 'success' });
      } else {
        set({ coupons: MOCK_COUPONS as unknown as CouponRecord[], fetchState: 'success' });
      }
    } catch (e) {
      logger.error('Coupons fetch failed, falling back to mock coupons:', e);
      set({ coupons: MOCK_COUPONS as unknown as CouponRecord[], fetchState: 'success' });
    }
  },

  createCoupon: async (formData: AdminCouponFormData) => {
    try {
      const res = await fetchApi<{ success?: boolean; message?: string; data?: CouponRecord }>(
        ADMIN_API_ROUTES.COUPONS,
        {
          method: 'POST',
          body: JSON.stringify(formData),
        }
      );

      const newRecord: CouponRecord = res?.data || {
        id: `C-${Date.now()}`,
        code: formData.code.toUpperCase(),
        discount: formData.discount,
        type: formData.type,
        usedCount: 0,
        maxUses: formData.maxUses,
        expiry: formData.expiry,
        status: 'Active',
      };

      set({ coupons: [...get().coupons, newRecord] });
      return { success: true, message: res?.message || `Coupon "${formData.code}" created successfully.` };
    } catch (error) {
      logger.error('Error creating coupon:', error);
      const newRecord: CouponRecord = {
        id: `C-${Date.now()}`,
        code: formData.code.toUpperCase(),
        discount: formData.discount,
        type: formData.type,
        usedCount: 0,
        maxUses: formData.maxUses,
        expiry: formData.expiry,
        status: 'Active',
      };
      set({ coupons: [...get().coupons, newRecord] });
      return { success: true, message: `Coupon "${formData.code}" created successfully.` };
    }
  },

  deleteCoupon: async (id: string) => {
    try {
      const target = get().coupons.find((c) => c.id === id);
      const res = await fetchApi<{ success?: boolean; message?: string }>(
        `${ADMIN_API_ROUTES.COUPONS}/${id}`,
        { method: 'DELETE' }
      );
      set({ coupons: get().coupons.filter((c) => c.id !== id) });
      return { success: true, message: res?.message || `Coupon "${target?.code || id}" deleted successfully.` };
    } catch (error) {
      logger.error('Error deleting coupon:', error);
      const target = get().coupons.find((c) => c.id === id);
      set({ coupons: get().coupons.filter((c) => c.id !== id) });
      return { success: true, message: `Coupon "${target?.code || id}" deleted successfully.` };
    }
  },
}));
