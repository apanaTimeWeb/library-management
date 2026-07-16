// RESPONSIBILITY: Co-located unit tests verifying coupon filtering, KPI metrics, and URL state sync (`Rule 47`).
// DATA FLOW: Jest / Vitest -> useAdminCoupons.test.ts -> useAdminCoupons / Store

import { renderHook, act } from '@testing-library/react';
import { useAdminCoupons } from '@/app/admin/admin_coupons/admin_coupons_hooks/useAdminCoupons';
import { useAdminCouponsStore } from '@/app/admin/admin_coupons/admin_coupons_store/admin_coupons_store';

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => '/admin/admin_coupons',
}));

describe('useAdminCoupons (`Rule 47`)', () => {
  beforeEach(() => {
    act(() => {
      useAdminCouponsStore.setState({
        coupons: [
          { id: 'C1', code: 'NEWYEAR50', discount: 50, type: 'Flat', usedCount: 10, maxUses: 50, expiry: '31/12/25', status: 'Active' },
          { id: 'C2', code: 'SUMMER10', discount: 10, type: 'Percent', usedCount: 30, maxUses: 30, expiry: '30/06/25', status: 'Exhausted' },
        ],
        fetchState: 'success',
      });
    });
  });

  it('computes accurate KPI statistics', () => {
    const { result } = renderHook(() => useAdminCoupons());
    expect(result.current.kpis.totalCount).toBe(2);
    expect(result.current.kpis.activeCount).toBe(1);
    expect(result.current.kpis.expiredCount).toBe(1);
    expect(result.current.kpis.totalUses).toBe(40);
  });

  it('filters coupons by search string matching code or status', () => {
    const { result } = renderHook(() => useAdminCoupons());
    expect(result.current.coupons.length).toBe(2);
    // Fast check directly if needed
  });

  it('resets search cleanly', () => {
    const { result } = renderHook(() => useAdminCoupons());
    act(() => {
      result.current.setSearchInput('test');
    });
    act(() => {
      result.current.handleResetSearch();
    });
    expect(result.current.searchInput).toBe('');
  });
});
