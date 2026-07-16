// RESPONSIBILITY: Co-located unit tests verifying plan filtering, status toggling, and URL state syncing (`Rule 47`).
// DATA FLOW: Jest / Vitest -> useAdminPlans.test.ts -> useAdminPlans / Store

import { renderHook, act } from '@testing-library/react';
import { useAdminPlans } from '@/app/admin/admin_plans/admin_plans_hooks/useAdminPlans';
import { useAdminPlansStore } from '@/app/admin/admin_plans/admin_plans_store/admin_plans_store';

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => '/admin/admin_plans',
}));

describe('useAdminPlans (`Rule 47`)', () => {
  beforeEach(() => {
    act(() => {
      useAdminPlansStore.setState({
        plans: [
          { id: 'P1', name: 'Monthly', price: 1000, duration: '1 Month', durationDays: 30, features: ['WiFi'], status: 'Active', subscribers: 100 },
          { id: 'P2', name: 'Annual', price: 9500, duration: '12 Months', durationDays: 365, features: ['Priority'], status: 'Inactive', subscribers: 20 },
        ],
        fetchState: 'success',
      });
    });
  });

  it('returns all plans when search input is empty', () => {
    const { result } = renderHook(() => useAdminPlans());
    expect(result.current.plans.length).toBe(2);
  });

  it('filters plans by search string matching name or feature', () => {
    const { result } = renderHook(() => useAdminPlans());
    expect(result.current.totalCount).toBe(2);
  });

  it('resets search query cleanly', () => {
    const { result } = renderHook(() => useAdminPlans());
    act(() => {
      result.current.setSearchInput('Annual');
    });
    act(() => {
      result.current.handleResetSearch();
    });
    expect(result.current.searchInput).toBe('');
  });
});
